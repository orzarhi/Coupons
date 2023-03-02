import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { SelectInput } from "~/components/define/_logic/SelectInput";
import { PersonType } from "~/constants/PersonType";
import { useAdministrations } from "~/hooks/useAdministrations";
import { useCompanies } from "~/hooks/useCompanies";
import { useDepartments } from "~/hooks/useDepartments";
import {
	useAddEmployee,
	useAssignAdminToAdministration,
	useUpdateEmployee,
} from "~/hooks/useEmployees";
import { useAuthStore } from "~/store/auth";
import * as toastMessages from "~/utils/notification/index";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import { InputText } from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const { token } = useAuthStore();

	const [radioButtons, setRadioButtons] = useState({
		isActive: info?.isActive?.toString(),
		allowed: info?.canUseInFreeShift?.toString(),
		isAdministrationAdmin: info?.isAdministrationAdmin?.toString(),
	});
	const [radioButtonsAdd, setRadioButtonsAdd] = useState({
		allowed: "false",
		isAdministrationAdmin: "false",
	});

	const [selectedValueCompany, setSelectedValueCompany] = useState("");
	const [selectedValueDepartment, setSelectedValueDepartment] = useState("");
	const [selectedAdministration, setSelectedAdministration] = useState("");

	const { data: dataDepartments } = useDepartments(token);

	const { data: dataCompanies } = useCompanies(token);

	const { data: dataAdministrations, isLoading: isLoadingAdministrations } =
		useAdministrations(token);

	const usernameInputRef = useRef();
	const passwordInputRef = useRef();
	const nameInputRef = useRef();
	const codeInputRef = useRef();
	const idInputRef = useRef();
	const phoneNumberInputRef = useRef();
	const quantityMealsInputRef = useRef();

	const clearInputs = () => {
		usernameInputRef.current.value = "";
		passwordInputRef.current.value = "";
		nameInputRef.current.value = "";
		codeInputRef.current.value = "";
		idInputRef.current.value = "";
		phoneNumberInputRef.current.value = "";
		quantityMealsInputRef.current.value = "";
	};

	const { mutate: addMutateEmployee } = useAddEmployee(
		setOpen,
		open,
		clearInputs,
		refetch
	);

	const { mutate: updateMutateEmployee } = useUpdateEmployee(
		setOpen,
		open,
		refetch
	);

	const { mutate: assignMutateAdminToAdministration } =
		useAssignAdminToAdministration(setOpen, open, clearInputs, refetch);

	const onCompanyAtuoCompleteChange = (value) => {
		setSelectedValueCompany(value);
	};
	const onDepartmentAtuoCompleteChange = (value) => {
		setSelectedValueDepartment(value);
	};

	const onAdministrationsAtuoCompleteChange = (value) => {
		setSelectedAdministration(value);
	};
	const departmentsInCompany = dataCompanies?.filter(
		(company) => company?.companyName === selectedValueCompany?.label
	);

	const dataDepartmentsInCompany = departmentsInCompany?.map(
		(departments) => departments?.departments
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const username = usernameInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;
		const employeeName = nameInputRef?.current?.value;
		const employeeCode = codeInputRef?.current?.value;
		const employeeId = idInputRef?.current?.value;
		const phoneNumber = phoneNumberInputRef?.current?.value;
		const maxMealsPerDay = quantityMealsInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (
					!username ||
					!password ||
					!employeeName ||
					!employeeCode ||
					!employeeId ||
					!phoneNumber ||
					!maxMealsPerDay
				) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				} else {
					const newEmployee = {
						employeeCode,
						employeeName,
						employeeId,
						companyCode: selectedValueCompany.id,
						departmentCode: selectedValueDepartment.id,
						phoneNumber,
						maxMealsPerDay,
						username,
						password,
						canUseInFreeShift:
							radioButtonsAdd.allowed === "true" ? true : false,
						isAdministrationAdmin:
							radioButtonsAdd.isAdministrationAdmin === "true"
								? true
								: false,
						type: PersonType.EMPLOYEE.id,
					};
					addMutateEmployee(newEmployee, token);
				}
			} else if (open.title === "edit") {
				const updateEmployee = {
					employeeCode: info?.employeeCode,
					employeeName,
					employeeId,
					departmentCode:
						selectedValueDepartment === ""
							? info?.departmentCode
							: selectedValueDepartment.id,
					companyCode:
						selectedValueCompany === ""
							? info?.companyCode
							: selectedValueCompany.id,
					phoneNumber,
					maxMealsPerDay,
					username,
					isActive: radioButtons.isActive === "true" ? true : false,
					canUseInFreeShift:
						radioButtons.allowed === "true" ? true : false,
					isAdministrationAdmin:
						radioButtons.isAdministrationAdmin === "true"
							? true
							: false,
				};

				updateMutateEmployee(updateEmployee, token);
			} else if (open.title === "assign") {
				const assignAdminToAdministration = {
					employeeCode: info?.employeeCode,
					administrationCode: selectedAdministration.id,
				};

				assignMutateAdminToAdministration(
					assignAdminToAdministration,
					token
				);
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
					<AutocompleteInput
						options={dataAdministrations?.map((administration) => ({
							label: administration.name,
							id: administration.code,
						}))}
						onChange={onAdministrationsAtuoCompleteChange}
						label={"מנהלה"}
					/>
				)}
				{open.title !== "assign" && (
					<>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.username}
							originalText={"שם משתמש"}
							ref={usernameInputRef}
						/>
						{title === "הוספת עובד חדש" && (
							<InputText
								title={title}
								action={"עריכת נתונים"}
								originalText={"סיסמא"}
								ref={passwordInputRef}
							/>
						)}
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.employeeName}
							originalText={"שם עובד"}
							ref={nameInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.employeeCode}
							originalText={"קוד עובד"}
							ref={codeInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.employeeId}
							originalText={"מספר זהות"}
							ref={idInputRef}
						/>
						{open.title === "add" && (
							<>
								<AutocompleteInput
									options={dataCompanies?.map((companie) => ({
										label: companie.companyName,
										id: companie.companyCode,
									}))}
									onChange={onCompanyAtuoCompleteChange}
									// defaultLabel={info?.companyName}
									// defaultCode={info?.companyCode}
									label={"חברות"}
								/>

								{selectedValueCompany && (
									<AutocompleteInput
										options={dataDepartmentsInCompany[0]?.map(
											(department) => ({
												label: department?.name,
												id: department?.code,
											})
										)}
										onChange={
											onDepartmentAtuoCompleteChange
										}
										// defaultLabel={info?.departmentName}
										// defaultCode={info?.departmentCode}
										label={"מחלקות"}
									/>
								)}
							</>
						)}

						{open.title === "edit" && (
							<>
								<AutocompleteInput
									options={dataCompanies?.map((companie) => ({
										label: companie.companyName,
										id: companie.companyCode,
									}))}
									onChange={onCompanyAtuoCompleteChange}
									// defaultLabel={info?.companyName}
									// defaultCode={info?.companyCode}
									label={info?.companyName}
								/>
								<AutocompleteInput
									options={dataDepartments?.map(
										(department) => ({
											label: department?.name,
											id: department?.code,
										})
									)}
									onChange={onDepartmentAtuoCompleteChange}
									// defaultLabel={info?.departmentName}
									// defaultCode={info?.departmentCode}
									label={info?.departmentName}
								/>
							</>
						)}
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.phoneNumber}
							originalText={"מספר פלאפון"}
							ref={phoneNumberInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.maxMealsPerDay}
							originalText={"כמות ארוחה ליום"}
							ref={quantityMealsInputRef}
						/>
						<div className="grid justify-items-center w-full">
							{open.title === "edit" && (
								<>
									<RadioButtons
										title={"פעיל:"}
										identification={"active"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={info?.isActive}
										type={open?.title}
									/>
									<RadioButtons
										title={
											"זכאי למימוש קופונים במשמרת ערב ללא חיוב:"
										}
										identification={"allowed"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={info?.canUseInFreeShift}
										type={open?.title}
									/>
									<RadioButtons
										title={"מנהל מחלקה:"}
										identification={"isAdministrationAdmin"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={
											info?.isAdministrationAdmin
										}
										type={open?.title}
									/>
								</>
							)}
							{open.title === "add" && (
								<>
									<RadioButtons
										title={
											"זכאי למימוש קופונים במשמרת ערב ללא חיוב:"
										}
										identification={"allowed"}
										setRadioButtons={setRadioButtonsAdd}
										radioButtons={radioButtonsAdd}
										defaultValue={radioButtonsAdd}
										type={open?.title}
									/>
									<RadioButtons
										title={"מנהל מחלקה:"}
										identification={"isAdministrationAdmin"}
										setRadioButtons={setRadioButtonsAdd}
										radioButtons={radioButtonsAdd}
										defaultValue={radioButtonsAdd}
										type={open?.title}
									/>
								</>
							)}
						</div>
					</>
				)}
			</div>
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

export default Form;
