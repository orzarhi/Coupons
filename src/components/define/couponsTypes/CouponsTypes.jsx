import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useCouponsTypes } from "~/hooks/useCouponsTypes";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

const CouponsTypes = () => {
	const [info, setInfo] = useState({});
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});
	const { data, refetch, isLoading } = useCouponsTypes();

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

			<div className="relative bottom-4 w-9/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
				{data && (
					<TableContainer component={Paper} sx={{ height: 550 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell align="right">סוג</TableCell>
									<TableCell align="right">ארוחה</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row) => (
									<Rows
										key={row.couponTypeCode}
										row={row}
										setOpen={setOpen}
										open={open}
										setInfo={setInfo}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
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
