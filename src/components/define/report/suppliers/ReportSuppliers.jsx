import React from "react";
import { useState } from "react";
import { DataGrid, heIL } from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Details from "../../_logic/Details";
import { columns } from "./columns";
import { useSupplierReport } from "~/hooks/useReport";
import Actions from "./actions/Actions";
import { Pdf } from "./pdf/Pdf";
import { Xls } from "./xls/Xls";
import { useAuthStore } from "~/store/auth";

export const ReportSuppliers = () => {
	const [showReport, setShowReport] = useState(false);
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});
	const [data, fetchReport] = useSupplierReport();

	return (
		<>
			<Details
				title="דוחות מימוש ספקים"
				identification="report"
				textBtn="בחר/י ספק להצגת הדוח"
				setOpen={setOpen}
				open={open}
				className="!bg-blue-700 !text-white hover:!bg-blue-600 !w-60 !text-sm"
				showTextField={false}
			/>
			{data && (
				<Xls
					data={data}
					title={"SuppliersReport"}
					content={"ייצא לקובץ לאקסל"}
				/>
			)}
			{showReport &&
				(data ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={`${data[0]?.usedUsername} - דוח קופונים לספק`}
								dates={`${year} - ${month}`}
								data={data}
							/>
						}
						filename="SupplierReport.pdf"
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
			<div className="relative bottom-2 w-2/6 block m-auto p-5 xl:w-2/5 xl:relative xl:bottom-2 lg:w-3/5 sm:w-10/12">
				{data && (
					<DataGrid
						rows={data}
						columns={columns}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(rows) => rows.usedDate}
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
