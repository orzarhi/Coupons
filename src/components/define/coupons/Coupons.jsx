import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useCoupons } from "~/hooks/useCoupons";
import { useAuthStore } from "~/store/auth";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

const Coupons = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		code: "",
	});

	const { token } = useAuthStore();

	const { data: dataCoupons, refetch, isLoading } = useCoupons(token);

	const data = dataCoupons?.filter((coupons) =>
		coupons?.couponName.toLowerCase().includes(inputSearch.toLowerCase())
	);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת קופון"
				setOpen={setOpen}
				open={open}
				textBtn="הוספת קופון חדש"
				// showTextField={false}
				setInputSearch={setInputSearch}
				label="קופון"
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>
			<div className="relative bottom-2 w-10/12 block m-auto p-5 xl:w-10/12 xl:relative xl:bottom-2">
				{data && (
					<TableContainer component={Paper} sx={{ height: 600 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell align="right">קוד</TableCell>
									<TableCell align="right">שם</TableCell>
									<TableCell align="right">תיאור</TableCell>
									<TableCell align="right">סוג</TableCell>
									<TableCell align="right">
										סכום החיוב
									</TableCell>
									<TableCell align="right">
										תוקף - שעות
									</TableCell>

									<TableCell align="right">פעיל</TableCell>
									<TableCell align="right">שיוך</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map((row) => (
									<Rows
										key={row.couponCode}
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

export default Coupons;
