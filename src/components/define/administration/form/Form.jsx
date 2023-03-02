import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import {
	useAddAdministration,
	useUpdateAdministration,
} from "~/hooks/useAdministrations";
import * as toastMessages from "~/utils/notification/index";
import { InputText } from "./InputText";
// import { RadioButtons } from "./RadioButtons";
import { RadioButtons } from "~/components/define/_logic/RadioButtons";
import {
	useAssignCompanyToAdministration,
	useCompanies,
} from "~/hooks/useCompanies";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import {
	useAssignAdminToAdministration,
	useEmployees,
} from "~/hooks/useEmployees";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);
	const nameInputRef = useRef();

	const [assignRadioButtons, setAssignRadioButtons] = useState("");
	const [selectedValueCompany, setSelectedValueCompany] = useState("");
	const [selectedValueEmployee, setSelectedValueEmployee] = useState("");

	const { data: dataEmployees, isLoading: isLoadingEmployees } =
		useEmployees();

	const clearInputs = () => {
		nameInputRef.current.value = "";
	};

	const { mutate: addMutateAdministration } = useAddAdministration(
		setOpen,
		open,
		clearInputs,
		refetch
	);
	const { mutate: updateMutateAdministration } = useUpdateAdministration(
		setOpen,
		open,
		refetch
	);
	const { mutate: assignMutateAdminToAdministration } =
		useAssignAdminToAdministration(setOpen, open, clearInputs, refetch);

	const { data: dataCompanies, isLoading: isLoadingCompanies } =
		useCompanies();

	const { mutate: assignMutateCompanyToAdministration } =
		useAssignCompanyToAdministration(setOpen, open, refetch);

	const employeeAdministrationAdmin = dataEmployees?.filter(
		(employee) => employee.isAdministrationAdmin && employee
	);

	const onCompanyAtuoCompleteChange = (value) => {
		setSelectedValueCompany(value);
	};

	const onEmployeeAtuoCompleteChange = (value) => {
		setSelectedValueEmployee(value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const name = nameInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (!name) {
					toastMessages.infoMessage("נא למלא את השדה");
				} else {
					const newAdministration = { name };

					addMutateAdministration(newAdministration);
				}
			} else if (open.title === "edit") {
				const updateAdministration = {
					code: info?.code,
					name,
					isActive: radioButtons === "true" ? true : false,
				};

				updateMutateAdministration(updateAdministration);
			} else if (
				open.title === "assign" &&
				assignRadioButtons == "true"
			) {
				const assignAdministrationToCompany = {
					companyCode: selectedValueCompany?.id,
					administrationCode: info?.code,
				};

				assignMutateCompanyToAdministration(
					assignAdministrationToCompany
				);
			} else if (
				open.title === "assign" &&
				assignRadioButtons == "false"
			) {
				const assignAdminToAdministration = {
					administrationCode: info?.code,
					employeeCode: selectedValueEmployee?.id,
				};
				assignMutateAdminToAdministration(assignAdminToAdministration);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת");
		}
	};
	return (
		<>
			<span className="block text-center text-2xl mb-2">{title}</span>
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title === "assign" && (
					<RadioButtons
						title={"שיוך:"}
						setRadioButtons={setAssignRadioButtons}
						labelTrue={"לחברה"}
						labelFalse={"למנהל"}
					/>
				)}
				{open.title !== "assign" && (
					<InputText
						title={title}
						action={"עריכת נתונים"}
						info={info?.name}
						originalText={"שם"}
						ref={nameInputRef}
					/>
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

				{assignRadioButtons === "true" && (
					<AutocompleteInput
						options={dataCompanies?.map((companie) => ({
							label: companie.companyName,
							id: companie.companyCode,
						}))}
						onChange={onCompanyAtuoCompleteChange}
						isLoading={isLoadingCompanies}
						label={"חברות"}
					/>
				)}
				{assignRadioButtons === "false" && (
					<AutocompleteInput
						options={employeeAdministrationAdmin?.map(
							(employee) => ({
								label: employee.employeeName,
								id: employee.employeeCode,
							})
						)}
						onChange={onEmployeeAtuoCompleteChange}
						isLoading={isLoadingEmployees}
						label={"עובדים"}
					/>
				)}
			</div>

			<div className="flex items-end flex-col p-2">
				{open.title !== "edit" && (
					<IconButton
						className="!text-white !bg-green-700 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				)}
				{open.title === "edit" && (
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
