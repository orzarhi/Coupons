import { Checkbox, FormControlLabel } from "@mui/material";
import { DataGrid, heIL } from "@mui/x-data-grid";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useUsers } from "~/hooks/useUsers";
import { AutocompleteInput } from "../_logic/AutocompleteInput";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";

const Registration = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [checkedboxIsActive, setCheckedboxIsActive] = useState(false);
	const [checkedboxIsSysAdmin, setCheckedboxIsSysAdmin] = useState(false);
	const [checkedboxUserEmployee, setCheckedboxUserEmployee] = useState(false);
	const [checkedboxUserSupliers, setCheckedboxUserSupliers] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});
	const { data: dataUsers, refetch, isLoading } = useUsers();

	const data = dataUsers?.filter((user) =>
		user.username.toLowerCase().includes(inputSearch.toLowerCase())
	);

	const dataCheckedIsActive = dataUsers?.filter((user) => user.isActive);
	const dataCheckedIsSysAdmin = dataUsers?.filter((user) => user.isSysAdmin);
	const dataCheckedUserEmployee = dataUsers?.filter(
		(user) => user.typeDescription === "עובד"
	);
	const dataCheckedUsercSupliers = dataUsers?.filter(
		(user) => user.typeDescription === "עסק"
	);
	const columnsResult = columns(setOpen, open, setInfo);

	const dataResult = checkedboxIsActive
		? dataCheckedIsActive
		: checkedboxIsSysAdmin
		? dataCheckedIsSysAdmin
		: checkedboxUserEmployee
		? dataCheckedUserEmployee
		: checkedboxUserSupliers
		? dataCheckedUsercSupliers
		: data;
	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="משתמשים"
				setOpen={setOpen}
				open={open}
				setInputSearch={setInputSearch}
				label="משתמש"
				showBtn={false}
			/>
			<div className="flex justify-center">
				<AutocompleteInput
					options={dataUsers?.map((user) => ({
						label: user.username,
						id: user.username,
					}))}
					// onChange={onAdministrationsAtuoCompleteChange}
					label={"פילטרים"}
				/>
			</div>
			<div className="flex justify-center mt-4">
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="עובד"
					onClick={() =>
						setCheckedboxUserEmployee(!checkedboxUserEmployee)
					}
				/>
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="עסק"
					onClick={() =>
						setCheckedboxUserSupliers(!checkedboxUserSupliers)
					}
				/>
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="פעיל"
					onClick={() => setCheckedboxIsActive(!checkedboxIsActive)}
				/>
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="הרשאת מנהל"
					onClick={() =>
						setCheckedboxIsSysAdmin(!checkedboxIsSysAdmin)
					}
				/>
			</div>
			<div className="relative bottom-4 w-2/5 block m-auto p-5 xl:w-3/6 xl:relative xl:bottom-4 lg:w-4/6 md:w-5/6 sm:w-4/5">
				{dataUsers && (
					<DataGrid
						rows={dataResult}
						columns={columnsResult}
						pageSize={25}
						rowsPerPageOptions={[25]}
						sx={{
							height: 600,
							direction: "ltr",
						}}
						getRowId={(row) => row.username}
						localeText={
							heIL.components.MuiDataGrid.defaultProps.localeText
						}
					/>
				)}
			</div>
			{open.action && (
				<Actions
					open={open}
					setOpen={setOpen}
					info={info}
					refetch={refetch}
				/>
			)}
		</>
	);
};

export default Registration;
