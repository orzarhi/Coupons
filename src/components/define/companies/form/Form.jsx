import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { SelectInput } from "~/components/define/_logic/SelectInput";
import { useAdministrations } from "~/hooks/useAdministrations";
import {
	useAddCompany,
	useAssignCompanyToAdministration,
	useUpdateCompany,
} from "~/hooks/useCompanies";
import { useAuthStore } from "~/store/auth";
import * as toastMessages from "~/utils/notification/index";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import { InputText } from "./InputText";
// import { RadioButtons } from "./RadioButtons";
import { RadioButtons } from "~/components/define/_logic/RadioButtons";
import { RadioButtonsThreeOptions } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);
	const [selectedAdministrations, setSelectedAdministrations] = useState("");

	const { data: dataAdministrations, isLoadingAdministrations } =
		useAdministrations();

	const companyNameInputRef = useRef();
	const emailInputRef = useRef();
	const phoneNumberInputRef = useRef();
	const logoFileInputRef = useRef();

	const clearInputs = () => {
		companyNameInputRef.current.value = "";
		emailInputRef.current.value = "";
		phoneNumberInputRef.current.value = "";
		logoFileInputRef.current.value = "";
	};

	const { mutate: addMutateCompany } = useAddCompany(
		setOpen,
		open,
		clearInputs,
		refetch
	);
	const { mutate: updateMutateCompany } = useUpdateCompany(
		setOpen,
		open,
		refetch
	);
	const { mutate: assignMutateCompanyToAdministration } =
		useAssignCompanyToAdministration(setOpen, open, refetch);

	const submitHandler = async (e) => {
		e.preventDefault();

		const companyName = companyNameInputRef?.current?.value;
		const email = emailInputRef?.current?.value;
		const phoneNumber = phoneNumberInputRef?.current?.value;
		const logoFile = logoFileInputRef?.current?.value;
		try {
			if (open.title === "add") {
				if (!companyName || !email || !phoneNumber || !logoFile) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				} else {
					const newCompany = {
						companyName,
						email,
						phoneNumber,
						logoFile,
					};

					addMutateCompany(newCompany);
				}
			} else if (open.title === "edit") {
				const updateCompany = {
					companyCode: info?.companyCode,
					companyName,
					email,
					phoneNumber,
					logoFile,
					isActive: radioButtons === "true" ? true : false,
				};

				updateMutateCompany(updateCompany);
			} else if (open.title === "assign") {
				const assignCompanyToAdministrations = {
					companyCode: info?.companyCode,
					administrationCode: selectedAdministrations.id,
				};

				assignMutateCompanyToAdministration(
					assignCompanyToAdministrations
				);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת");
		}
	};

	const onAdministrationsAtuoCompleteChange = (value) => {
		setSelectedAdministrations(value);
	};
	return (
		<>
			<span className="block text-center text-2xl mb-2">
				{open.title === "assign"
					? `שיוך חברת - ${info?.companyName} `
					: title}
			</span>
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title !== "assign" && (
					<>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.companyName}
							originalText={"שם"}
							ref={companyNameInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.email}
							originalText={"מייל"}
							ref={emailInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.phoneNumber}
							originalText={"מספר טלפון"}
							ref={phoneNumberInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.logoFile}
							originalText={"לוגו"}
							ref={logoFileInputRef}
						/>
					</>
				)}
				{open.title === "assign" && (
					<>
						<RadioButtonsThreeOptions
							title={"שיוך:"}
							setRadioButtons={setRadioButtons}
							type={info?.isActive}
						/>
						{/* <AutocompleteInput
							options={dataAdministrations?.map(
								(administrations) => ({
									label: administrations.name,
									id: administrations.code,
								})
							)}
							onChange={onAdministrationsAtuoCompleteChange}
							isLoading={isLoadingAdministrations}
							label={"הנהלה"}
						/> */}
					</>
				)}

				<div className="grid justify-items-center w-full">
					{open.title === "edit" && (
						<RadioButtons
							title={"פעיל:"}
							setRadioButtons={setRadioButtons}
							type={info?.isActive}
						/>
					)}
				</div>
			</div>
			<div className="flex items-end flex-col p-2">
				{open.title !== "edit" ? (
					<IconButton
						className="!text-white !bg-green-700 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				) : (
					<IconButton
						className="!text-white !bg-cyan-600 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				)}
			</div>
		</>
	);
};

export default Form;
