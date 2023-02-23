import { DataGrid, heIL } from "@mui/x-data-grid";
import React, { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useSystemInfo } from "~/hooks/useSystemInfo";
import Details from "../_logic/Details";
import { Actions } from "./actions/Actions";
import { columns } from "./columns";

export const SystemInfo = () => {
	const [info, setInfo] = useState({});
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data, refetch, isLoading } = useSystemInfo();

	const columnsResult = columns(setOpen, open, setInfo);

	if (isLoading) return <Spinner />;

	return (
		<>
			<span className="block text-center text-2xl">הגדרות</span>

			<div className="relative w-1/3 block m-auto p-5 xl:w-2/5 xl:relative ">
				{data && (
					<DataGrid
						rows={data}
						columns={columnsResult}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(rows) => rows.id}
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
