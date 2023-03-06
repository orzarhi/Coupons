import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Spinner from "~/components/ui/spinner/Spinner";
import { useShifts } from "~/hooks/useShifts";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

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
	const dataResult = checkedboxIsActive ? dataCheckedIsActive : data;

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

			<div className="relative bottom-4 w-full block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
				{data && (
					<TableContainer component={Paper} sx={{ height: 550 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell align="right">משמרת</TableCell>
									<TableCell align="right">התחלה</TableCell>
									<TableCell align="right">סיום</TableCell>
									<TableCell align="right">ראשון</TableCell>
									<TableCell align="right">שני</TableCell>
									<TableCell align="right">שלישי</TableCell>
									<TableCell align="right">רביעי</TableCell>
									<TableCell align="right">חמישי</TableCell>
									<TableCell align="right">שישי</TableCell>
									<TableCell align="right">שבת</TableCell>
									<TableCell align="right">
										ללא גביה מעובד מורשה
									</TableCell>
									<TableCell align="right">פעיל</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataResult.map((row) => (
									<Rows
										key={row.shiftCode}
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
