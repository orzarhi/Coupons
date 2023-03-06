import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { useCompanyReport } from "~/hooks/useReport";
import Details from "../../_logic/Details";
import Actions from "./actions/Actions";
import { Pdf } from "./pdf/Pdf";
import Rows from "./Rows";
import { Xls } from "./xls/Xls";

export const ReportCompanys = () => {
	const [showReport, setShowReport] = useState(false);
	const [dates, setDates] = useState({
		fromDate: "",
		toDate: "",
	});

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const [data, fetchReport] = useCompanyReport();

	return (
		<>
			<Details
				title="דוחות מימוש קופונים - חברות"
				identification="report"
				textBtn="בחר/י חברה להצגת הדוח"
				setOpen={setOpen}
				open={open}
				className="!bg-blue-700 !text-white hover:!bg-blue-600 !w-60 !text-sm"
				showTextField={false}
			/>

			{data && (
				<Xls
					data={data}
					title={"CompanysReport"}
					content={"ייצא לקובץ לאקסל"}
				/>
			)}
			{showReport &&
				(data ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={`דוח קופונים לחברה - ${data[0]?.companyName} `}
								data={data}
								dates={`${new Date(
									dates.toDate
								).toLocaleDateString()} - ${new Date(
									dates.fromDate
								).toLocaleDateString()}`}
							/>
						}
						filename="CompanyReport.pdf"
					>
						{({ loading }) =>
							loading ? (
								<div className="flex justify-center text-xl capitalize mt-6">
									<button>טוען...</button>
								</div>
							) : (
								<>
									<div className="flex justify-center items-center text-xl mt-6">
										<button>הורדת המסמך</button>
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
				<div className="flex justify-center mt-3">
					<span className=" bg-yellow-200 text-lg font-bold">
						דוח מימוש קופונים לחברת - {data[0]?.companyName}
					</span>
				</div>
			)}
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
									<TableCell align="right">מימוש</TableCell>
									<TableCell align="right">עסק</TableCell>
									<TableCell align="right">
										מחיר ספק
									</TableCell>
									<TableCell align="right">
										מחיר עובד
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
					setDates={setDates}
					dates={dates}
				/>
			)}
		</>
	);
};
