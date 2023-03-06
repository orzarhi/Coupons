import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { useHilanMonthlyReport } from "~/hooks/useReport";
import Details from "../../_logic/Details";
import Actions from "./actions/Actions";
import { Pdf } from "./pdf/Pdf";
import Rows from "./Rows";
import { Xls } from "./xls/Xls";

export const ReportHilan = () => {
	const [showReport, setShowReport] = useState(false);
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const [data, fetchReport] = useHilanMonthlyReport();

	return (
		<>
			<Details
				title="דוחות חילן"
				identification="report"
				textBtn="בחר/י תאריך להצגת הדוח"
				setOpen={setOpen}
				open={open}
				className="!bg-blue-700 !text-white hover:!bg-blue-600 !w-60 !text-sm"
				showTextField={false}
			/>
			{data && (
				<Xls
					data={data}
					title={"HilangReport"}
					content={"ייצא לקובץ לאקסל"}
				/>
			)}
			{showReport &&
				(data ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={"דוח חילן"}
								dates={`${year} - ${month}`}
								data={data}
							/>
						}
						filename="BookkeepingReport.pdf"
					>
						{({ loading }) =>
							loading ? (
								<div className="flex justify-center text-xl capitalize mt-6">
									<Button>טוען...</Button>
								</div>
							) : (
								<>
									<div className="flex justify-center items-center text-xl mt-4">
										<button>הורדת המסמך כ PDF</button>
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
			<div className="relative top-2 w-7/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
				{data && (
					<TableContainer component={Paper} sx={{ height: 550 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell align="right">
										קוד עובד
									</TableCell>
									<TableCell align="right">שם עובד</TableCell>
									<TableCell align="right">
										סהכ ארוחות
									</TableCell>
									<TableCell align="right">
										סהכ מחיר
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row, i) => (
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
					setMonth={setMonth}
					setYear={setYear}
				/>
			)}
		</>
	);
};
