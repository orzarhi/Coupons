import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { AutocompleteInput } from "~/components/define/_logic/AutocompleteInput";
import { InputDates } from "~/components/define/_logic/DatesInput";
import { useCompanies } from "~/hooks/useCompanies";
import { getDates } from "~/utils/date";
import * as toastMessages from "~/utils/notification/index";

export const Form = ({
	title,
	setOpen,
	open,
	fetchReport,
	setShowReport,
	setDates,
	dates,
}) => {
	const [selectedCompany, setSelectedCompany] = useState("");

	const fromDateInputRef = useRef();
	const toDateInputRef = useRef();

	const { data: dataCompanies } = useCompanies();

	const submitHandler = (e) => {
		e.preventDefault();

		const fromDate = fromDateInputRef?.current?.value;
		const toDate = toDateInputRef?.current?.value;

		setDates({ ...dates, fromDate, toDate });

		try {
			if (open.title === "report") {
				if (!fromDate || !toDate || !selectedCompany.id) {
					toastMessages.infoMessage("נא למלא את כל השדות.");
				} else {
					const reportCompany = {
						companyCode: selectedCompany.id,
						fromDate,
						toDate,
					};
					fetchReport(reportCompany);
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

	const onCompanieAtuoCompleteChange = (value) => {
		setSelectedCompany(value);
	};
	return (
		<>
			<span className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
				{title}
			</span>
			{open.title === "report" && (
				<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
					<AutocompleteInput
						options={dataCompanies?.map((companie) => ({
							label: companie.companyName,
							id: companie.companyCode,
						}))}
						onChange={onCompanieAtuoCompleteChange}
						label={"חברות"}
					/>

					<div className="flex justify-center items-center ml-5 w-5/6 sm:grid sm:justify-center">
						<label className="text-base ml-2">מתאריך:</label>
						<InputDates
							title={title}
							action={"עריכת נתונים"}
							ref={fromDateInputRef}
							// It's false because not year and month
							// It's true because an initial date
							defaultValue={getDates(false, true)}
						/>

						<label className="text-base mr-5">עד תאריך:</label>
						<InputDates
							title={title}
							action={"עריכת נתונים"}
							ref={toDateInputRef}
							defaultValue={getDates()}
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
