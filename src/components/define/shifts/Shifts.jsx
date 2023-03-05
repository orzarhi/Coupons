import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { DataGrid, heIL } from "@mui/x-data-grid";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Spinner from "~/components/ui/spinner/Spinner";
import { useShifts } from "~/hooks/useShifts";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";

export const Shifts = () => {
	const [info, setInfo] = useState({});
	const [checkedboxIsActive, setCheckedboxIsActive] = useState(false);
	const [showFilters, setShowFilters] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data, refetch, isLoading } = useShifts();

	const dataCheckedIsActive = data?.filter((shift) => shift.isActive);

	const columnsResult = columns(setOpen, open, setInfo);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת משמרות"
				setOpen={setOpen}
				open={open}
				textBtn="הוספת משמרת"
				showTextField={false}
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>
			<div className="flex justify-center mt-4">
				<IconButton onClick={() => setShowFilters(!showFilters)}>
					<FaFilter />
				</IconButton>
			</div>
			<div className="flex justify-center">
				{showFilters && (
					<FormControlLabel
						control={<Checkbox defaultValue={false} />}
						label="פעיל"
						onChange={() =>
							setCheckedboxIsActive(!checkedboxIsActive)
						}
					/>
				)}
			</div>

			<div className="relative bottom-2 w-10/12 block m-auto p-5 xl:w-11/12 xl:relative xl:bottom-2 lg:w-11/12 md:w-10/12">
				{data && (
					<DataGrid
						rows={checkedboxIsActive ? dataCheckedIsActive : data}
						columns={columnsResult}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(rows) => rows.shiftCode}
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
