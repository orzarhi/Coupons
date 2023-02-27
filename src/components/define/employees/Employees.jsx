import { Checkbox, FormControlLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useEmployees } from "~/hooks/useEmployees";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

const Employees = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [checkedboxIsActive, setCheckedboxIsActive] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		code: "",
	});

	const { data: dataEmployees, refetch, isLoading } = useEmployees();

	const data = dataEmployees?.filter((employee) =>
		employee.employeeName.toLowerCase().includes(inputSearch.toLowerCase())
	);

	const dataCheckedIsActive = dataEmployees?.filter(
		(employee) => employee.isActive
	);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת עובדים"
				textBtn="הוספת עובד חדש"
				setOpen={setOpen}
				open={open}
				setInputSearch={setInputSearch}
				label="עובד"
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>
			<div className="flex justify-center mt-4">
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="פעיל"
					onClick={() => setCheckedboxIsActive(!checkedboxIsActive)}
				/>
				{/* <FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="הרשאת מנהל"
					onClick={() =>
						setCheckedboxIsSysAdmin(!checkedboxIsSysAdmin)
					}
				/> */}
			</div>
			<div className="relative bottom-4 w-3/4 block m-auto p-5 xl:w-11/12 xl:relative xl:bottom-4">
				{data && (
					<TableContainer component={Paper} sx={{ height: 600 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell align="right">קוד</TableCell>
									<TableCell align="right">שם</TableCell>
									<TableCell align="right">
										שם משתמש
									</TableCell>
									<TableCell align="right">
										תעודת זהות
									</TableCell>
									<TableCell align="right">
										מספר פלאפון
									</TableCell>
									<TableCell align="right">חברה</TableCell>
									<TableCell align="right">מחלקה</TableCell>

									<TableCell align="right">
										מספר ארוחות ביום
									</TableCell>
									<TableCell align="right">שיוך</TableCell>
									<TableCell align="right">פעיל</TableCell>
									<TableCell align="right">
										זכאי למימוש בערב
									</TableCell>
									<TableCell align="right">
										מנהל מחלקה
									</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map((row) => (
									<Rows
										key={row.employeeCode}
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

export default Employees;
