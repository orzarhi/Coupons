import { DataGrid, heIL } from "@mui/x-data-grid";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useUsersTypes } from "~/hooks/useUsersTypes";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";

const UserTypes = () => {
	const [info, setInfo] = useState({});
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data, refetch, isLoading } = useUsersTypes();
	const columnsResult = columns(setOpen, open, setInfo);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת סוגי משתמשים"
				setOpen={setOpen}
				open={open}
				textBtn="הוספת סוג משתמש חדש"
				showTextField={false}
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>

			<div className="relative bottom-2 w-2/5 block m-auto p-5 xl:w-1/2 xl:relative xl:bottom-2">
				{data && (
					<DataGrid
						rows={data}
						columns={columnsResult}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(rows) => rows.code}
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

export default UserTypes;
