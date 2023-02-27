import { DataGrid, heIL } from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import Details from "~/components/define/_logic/Details";
import { useEmployeeReport } from "~/hooks/useReport";
import Actions from "./actions/Actions";
import { columns } from "./columns";
import { Pdf } from "./pdf/Pdf";
import { Xls } from "./xls/Xls";

export const ReportEmployees = () => {
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

	const [data, fetchReport] = useEmployeeReport();

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
					data={data}
					title={"EmployeesReport"}
					content={"ייצא לקובץ לאקסל"}
				/>
			)}
			{showReport &&
				(data ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={` ${data[0]?.employeeCode} - דוח קופונים לעובד `}
								dates={`${new Date(
									dates.toDate
								).toLocaleDateString()} - ${new Date(
									dates.fromDate
								).toLocaleDateString()}`}
								data={data}
							/>
						}
						filename="CouponReport.pdf"
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
			<div className="relative bottom-2 w-3/6 block m-auto p-5 xl:w-3/4 xl:relative xl:bottom-2 sm:w-10/12">
				{data && (
					<DataGrid
						rows={data}
						columns={columns}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(rows) => rows.id}
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
					setDates={setDates}
					dates={dates}
				/>
			)}
		</>
	);
};
