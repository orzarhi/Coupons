import React, { useState } from "react";
import { useHilanMonthlyReport } from "~/hooks/useReport";
import { DataGrid, heIL } from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Details from "../../_logic/Details";
import { Pdf } from "./pdf/Pdf";
import { Xls } from "./xls/Xls";
import { Button } from "@mui/material";
import Actions from "./actions/Actions";
import { columns } from "./columns";
import { useAuthStore } from "~/store/auth";

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
			<div className="relative bottom-2 w-2/5 block m-auto p-5 xl:w-1/2 xl:relative xl:bottom-2 lg:w-8/12 sm:w-10/12">
				{data && (
					<DataGrid
						rows={data}
						columns={columns}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(rows) => rows.employeeCode}
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
					fetchReport={fetchReport}
					setShowReport={setShowReport}
					setMonth={setMonth}
					setYear={setYear}
				/>
			)}
		</>
	);
};
