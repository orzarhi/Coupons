import { Button } from "@mui/material";
import { DataGrid, heIL } from "@mui/x-data-grid";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useCouponsTypes } from "~/hooks/useCouponsTypes";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";

const CouponsTypes = () => {
	const [info, setInfo] = useState({});
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data, refetch, isLoading } = useCouponsTypes();
	const columnsResult = columns(setOpen, open, setInfo);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת סוגי קופון"
				textBtn="הוספת סוג קופון חדש"
				setOpen={setOpen}
				open={open}
				label="עובד"
				showTextField={false}
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>

			<div className="relative bottom-2 w-1/3 block m-auto p-5 xl:w-2/5 xl:relative xl:bottom-2 lg:w-3/6 md:w-4/6">
				{data && (
					<DataGrid
						rows={data}
						columns={columnsResult}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(row) => row.couponTypeCode}
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

export default CouponsTypes;
