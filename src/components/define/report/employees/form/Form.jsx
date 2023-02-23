import { IconButton } from "@mui/material";
import { useRef } from "react";
import { MdDone } from "react-icons/md";
import { InputDates } from "~/components/define/_logic/DatesInput";
import * as toastMessages from "~/utils/notification/index";
import { InputText } from "./InputText";

export const Form = ({
	title,
	setOpen,
	open,
	fetchReport,
	setShowReport,
	setDates,
	dates,
}) => {
	const employeeCodeInputRef = useRef();
	const fromDateInputRef = useRef();
	const toDateInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();

		const employeeCode = employeeCodeInputRef?.current?.value;
		const fromDate = fromDateInputRef?.current?.value;
		const toDate = toDateInputRef?.current?.value;

		setDates({ ...dates, fromDate, toDate });
		try {
			if (open.title === "report") {
				if (!fromDate || !toDate || !employeeCode) {
					toastMessages.infoMessage("נא למלא את כל השדות.");
				} else {
					const reportEmployee = {
						employeeCode,
						fromDate,
						toDate,
					};
					fetchReport(reportEmployee);
					setShowReport(true);
					setOpen({ ...open, popUp: false, action: false });
				}
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת");
		}
	};
	return (
		<>
			<span className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
				{title}
			</span>
			{open.title === "report" && (
				<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
					<InputText
						title={title}
						originalText={"קוד עובד"}
						ref={employeeCodeInputRef}
					/>
					<div className="flex justify-center items-center ml-5 w-5/6 sm:grid sm:justify-center">
						<label className="text-base ml-2">מתאריך:</label>
						<InputDates
							title={title}
							action={"עריכת נתונים"}
							ref={fromDateInputRef}
						/>

						<label className="text-base mr-5">עד תאריך:</label>
						<InputDates
							title={title}
							action={"עריכת נתונים"}
							ref={toDateInputRef}
						/>
					</div>
				</div>
			)}
			<div className="flex items-end flex-col p-2">
				<IconButton
					className="!text-white !bg-cyan-600 !text-3xl"
					onClick={submitHandler}
				>
					<MdDone />
				</IconButton>
			</div>
		</>
	);
};
