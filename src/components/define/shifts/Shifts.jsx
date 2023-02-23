import { DataGrid, heIL } from "@mui/x-data-grid";
import React, { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useShifts } from "~/hooks/useShifts";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";

export const Shifts = () => {
	const [info, setInfo] = useState({});
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data, refetch, isLoading } = useShifts();
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

			<div className="relative bottom-2 w-10/12 block m-auto p-5 xl:w-11/12 xl:relative xl:bottom-2">
				{data && (
					<DataGrid
						rows={data}
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
