import { Button, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useReducer } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Details from "~/components/define/_logic/Details";
import { FilterFields } from "~/constants/reports/employees/FilterFields";
import { useEmployeeReport } from "~/hooks/useReport";
import Actions from "./actions/Actions";
import { Pdf } from "./pdf/Pdf";
import Rows from "./Rows";
import { Xls } from "./xls/Xls";

const initialFiltersReducer = FilterFields.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: false }),
	{}
);
const filterReducer = (state, action) => {
	return { ...state, [action.id]: !state[action.id] };
};

export const ReportEmployees = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [dates, setDates] = useState({
		fromDate: "",
		toDate: "",
	});
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		employeeName: "",
	});

	const [filters, dispatch] = useReducer(
		filterReducer,
		initialFiltersReducer
	);

	const [data, fetchReport] = useEmployeeReport();

	const dataResult = useMemo(() => {
		let results = data?.filter((user) =>
			user.couponName.toLowerCase().includes(inputSearch.toLowerCase())
		);
		results = FilterFields.filter((f) => filters[f.id]).reduce(
			(acc, curr) => curr.apply(acc),
			results
		);

		return results;
	}, [data, filters]);

	const Filters = useMemo(
		() =>
			FilterFields.map((f) => (
				<FormControlLabel
					key={f.id}
					control={
						<Checkbox defaultValue={false} value={filters[f.id]} />
					}
					label={f.name}
					onChange={() => {
						dispatch(f);
					}}
				/>
			)),
		[filters]
	);

	return (
		<>
			<Details
				title="דוחות עובדים"
				identification="report"
				textBtn="בחר/י עובד להצגת הדוח"
				setOpen={setOpen}
				open={open}
				className="!bg-blue-700 !text-white hover:!bg-blue-600 !w-60 !text-sm"
				showTextField={false}
			/>

			{data && (
				<Xls
					data={dataResult}
					title={"EmployeesReport"}
					content={"ייצא לקובץ לאקסל"}
				/>
			)}
			{showReport &&
				(data ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={`דוח קופונים לעובד - ${open?.employeeName}`}
								dates={`${new Date(
									dates.toDate
								).toLocaleDateString()} - ${new Date(
									dates.fromDate
								).toLocaleDateString()}`}
								data={dataResult}
							/>
						}
						filename="CouponReport.pdf"
					>
						{({ loading }) =>
							loading ? (
								<div className="flex justify-center text-xl capitalize mt-6">
									<Button>טוען...</Button>
								</div>
							) : (
								<>
									<div className="flex justify-center items-center text-xl mt-6">
										<Button
											variant="contained"
											color="inherit"
										>
											הורדת המסמך כ pdf
										</Button>
									</div>
								</>
							)
						}
					</PDFDownloadLink>
				) : (
					<div className="flex justify-center text-xl text-red-500 mt-6">
						<span>לא קיימים נתונים</span>
					</div>
				))}
			{data && (
				<div className="flex justify-center">
					<IconButton onClick={() => setShowFilters(!showFilters)}>
						<FaFilter />
					</IconButton>
				</div>
			)}
			{showFilters && (
				<div className="flex justify-center mt-4">{Filters}</div>
			)}
			<div className="relative top-2 w-9/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
				{dataResult && (
					<TableContainer component={Paper} sx={{ height: 500 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell align="right">
										קוד עובד
									</TableCell>
									<TableCell align="right">קופון</TableCell>
									<TableCell align="right">
										קופון אורח
									</TableCell>

									<TableCell align="right">הנפקה</TableCell>
									<TableCell align="right">מומש</TableCell>
									<TableCell align="right">
										תאריך מימוש
									</TableCell>
									<TableCell align="right">עסק</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataResult.map((row, i) => (
									<Rows key={i} row={row} />
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
					fetchReport={fetchReport}
					setShowReport={setShowReport}
					setDates={setDates}
					dates={dates}
				/>
			)}
		</>
	);
};
