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
import * as toastMessages from "~/utils/notification/index";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import { InputText } from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState({
		isActive: info?.isActive?.toString(),
		allowed: info?.canUseInFreeShift?.toString(),
		isAdministrationAdmin: info?.isAdministrationAdmin?.toString(),
		canCreateGuestCoupon: info?.canCreateGuestCoupon?.toString(),
	});
	const [radioButtonsAdd, setRadioButtonsAdd] = useState({
		allowed: "false",
		isAdministrationAdmin: "false",
		canCreateGuestCoupon: "false",
	});

	const [selectedValueCompany, setSelectedValueCompany] = useState("");
	const [selectedValueDepartment, setSelectedValueDepartment] = useState("");
	const [selectedAdministration, setSelectedAdministration] = useState("");

	const { data: dataDepartments, isLoading: isLoadingDepartments } =
		useDepartments();

	const { data: dataCompanies, isLoading: isLoadingCompanies } =
		useCompanies();

	const { data: dataAdministrations, isLoading: isLoadingAdministrations } =
		useAdministrations();

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
					toastMessages.infoMessage("???? ???????? ???? ???? ??????????");
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
					addMutateEmployee(newEmployee);
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

				updateMutateEmployee(updateEmployee);
			} else if (open.title === "assign") {
				const assignAdminToAdministration = {
					employeeCode: info?.employeeCode,
					administrationCode: selectedAdministration.id,
				};

				assignMutateAdminToAdministration(assignAdminToAdministration);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("??????????: ?????????? ?????????????? ????????");
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
						isLoading={isLoadingAdministrations}
						label={"??????????"}
					/>
				)}
				{open.title !== "assign" && (
					<>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.username}
							originalText={"???? ??????????"}
							ref={usernameInputRef}
						/>
						{title === "?????????? ???????? ??????" && (
							<InputText
								title={title}
								action={"?????????? ????????????"}
								originalText={"??????????"}
								ref={passwordInputRef}
							/>
						)}
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.employeeName}
							originalText={"???? ????????"}
							ref={nameInputRef}
						/>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.employeeCode}
							originalText={"?????? ????????"}
							ref={codeInputRef}
						/>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.employeeId}
							originalText={"???????? ????????"}
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
									isLoading={isLoadingCompanies}
									label={"??????????"}
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
										label={"????????????"}
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
									isLoading={isLoadingCompanies}
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
									isLoading={isLoadingDepartments}
									label={info?.departmentName}
								/>
							</>
						)}
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.phoneNumber}
							originalText={"???????? ????????????"}
							ref={phoneNumberInputRef}
						/>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.maxMealsPerDay}
							originalText={"???????? ?????????? ????????"}
							ref={quantityMealsInputRef}
						/>
						<div className="grid justify-items-center w-full">
							{open.title === "edit" && (
								<>
									<RadioButtons
										title={"????????:"}
										identification={"active"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={info?.isActive}
										type={open?.title}
									/>
									<RadioButtons
										title={"?????????? ?????? ????????:"}
										identification={"allowed"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={info?.canUseInFreeShift}
										type={open?.title}
									/>
									<RadioButtons
										title={"???????? ??????????:"}
										identification={"isAdministrationAdmin"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={
											info?.isAdministrationAdmin
										}
										type={open?.title}
									/>
									<RadioButtons
										title={"???????? ???????????? ????????:"}
										identification={"canCreateGuestCoupon"}
										setRadioButtons={setRadioButtons}
										radioButtons={radioButtons}
										defaultValue={
											info?.canCreateGuestCoupon
										}
										type={open?.title}
									/>
								</>
							)}
							{open.title === "add" && (
								<>
									<RadioButtons
										title={"?????????? ?????? ????????:"}
										identification={"allowed"}
										setRadioButtons={setRadioButtonsAdd}
										radioButtons={radioButtonsAdd}
										defaultValue={radioButtonsAdd}
										type={open?.title}
									/>
									<RadioButtons
										title={"???????? ??????????:"}
										identification={"isAdministrationAdmin"}
										setRadioButtons={setRadioButtonsAdd}
										radioButtons={radioButtonsAdd}
										defaultValue={radioButtonsAdd}
										type={open?.title}
									/>
									<RadioButtons
										title={"???????? ???????????? ????????:"}
										identification={"canCreateGuestCoupon"}
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
