import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { InputMonth } from "~/components/define/_logic/DatesInput";
import { RadioButtons } from "~/components/define/_logic/RadioButtons";
import { getDates } from "~/utils/date";
import * as toastMessages from "~/utils/notification/index";

export const Form = ({
	title,
	setOpen,
	open,
	fetchReport,
	setShowReport,
	setMonth,
	setYear,
}) => {
	const [radioButtons, setRadioButtons] = useState("");

	const monthAndYearInputRef = useRef();

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
					toastMessages.infoMessage("נא למלא את כל השדות.");
				} else {
					const reportBookkeeping = {
						month,
						year,
						isSendMail: radioButtons === "true" ? true : false,
					};
					fetchReport(reportBookkeeping);
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
					<InputMonth
						ref={monthAndYearInputRef}
						// It's true because it's year and month
						// It's false because it's not an initial date
						defaultValue={getDates(true, false)}
					/>

					<RadioButtons
						title={"שליחה למייל"}
						setRadioButtons={setRadioButtons}
					/>
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
