import { IconButton } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { InputMonth } from "~/components/define/_logic/DatesInput";
import { RadioButtons } from "~/components/define/_logic/RadioButtons";
import { useSupplierReport } from "~/hooks/useReport";
import { getDates } from "~/utils/date";
import * as toastMessages from "~/utils/notification/index";
import { Pdf } from "../report/Pdf";

export const Form = ({ title, setOpen, open, dataSupplier }) => {
	const [radioButtons, setRadioButtons] = useState("");
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");
	const [showReport, setShowReport] = useState(false);

	const monthAndYearInputRef = useRef();

	const [data, fetchReport] = useSupplierReport();

	const submitHandler = (e) => {
		e.preventDefault();

		const monthAndYear = monthAndYearInputRef?.current?.value;
		setYear(monthAndYear?.toString()?.split("-")[0]);
		setMonth(monthAndYear?.toString()?.split("-")[1]);

		const year = monthAndYear?.toString()?.split("-")[0];
		const month = monthAndYear?.toString()?.split("-")[1];

		try {
			if (open.title === "report") {
				if (!monthAndYear || !radioButtons) {
					toastMessages.infoMessage("נא למלא את כל הפרטים.");
				} else {
					const reportSupplier = {
						supplierCode: dataSupplier?.supplierCode,
						month,
						year,
						isSendMail: radioButtons === "true" ? true : false,
					};
					fetchReport(reportSupplier);
					setShowReport(true);
				}
			}
		} catch (err) {
			toastMessages.errorMessage(err);
		}
	};

	return (
		<>
			<span className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
				{title}
			</span>
			{open.title === "report" && (
				<>
					<div className="flex justify-center items-center ml-5 w-5/6 sm:grid sm:justify-center">
						<label className="text-base ml-2">תאריך:</label>
						<InputMonth
							ref={monthAndYearInputRef}
							// It's true because it's year and month
							// It's false because it's not an initial date
							defaultValue={getDates(true, false)}
						/>
					</div>
					<RadioButtons
						title={"שליחה למייל"}
						setRadioButtons={setRadioButtons}
					/>
				</>
			)}
			<div className="flex items-end flex-col p-2">
				{open.title === "report" && (
					<IconButton
						className="!text-white !bg-cyan-600 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				)}
			</div>
			{showReport &&
				(data?.length > 0 ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={`${data[0]?.usedUsername} - דוח קופונים לעסק`}
								dates={`${year} - ${month}`}
								data={data}
							/>
						}
						filename="CouponReport.pdf"
					>
						{({ loading }) =>
							loading ? (
								<div className="flex justify-center text-xl bg-gray-600 text-white capitalize">
									<button>טוען...</button>
								</div>
							) : (
								<>
									<div className="flex justify-center text-xl bg-gray-600 text-white">
										<button>הצגת דוח</button>
									</div>
								</>
							)
						}
					</PDFDownloadLink>
				) : (
					<div className="flex justify-center text-xl bg-gray-600 text-white capitalize">
						<span>לא קיימים נתונים</span>
					</div>
				))}
		</>
	);
};
