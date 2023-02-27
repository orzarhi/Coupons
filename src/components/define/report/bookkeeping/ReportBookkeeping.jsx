import React, { useState } from "react";
import { DataGrid, heIL } from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Details from "../../_logic/Details";
import { columns } from "./columns";
import Actions from "./actions/Actions";
import { useBookkeepingReport } from "~/hooks/useReport";
import { Pdf } from "./pdf/Pdf";
import { Xls } from "./xls/Xls";
import { Button } from "@mui/material";

export const ReportBookkeeping = () => {
	const [showReport, setShowReport] = useState(false);
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});
	const [data, fetchReport] = useBookkeepingReport();

	return (
		<>
			<Details
				title="דוחות הנהלת חשבונות"
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
					title={"BookkeepingReport"}
					content={"ייצא לקובץ לאקסל"}
				/>
			)}
			{showReport &&
				(data ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={" דוח הנהלת חשבונות"}
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
			<div className="relative bottom-2 w-7/12 block m-auto p-5 xl:w-9/12 xl:relative xl:bottom-2 sm:w-10/12">
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