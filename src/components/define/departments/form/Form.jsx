import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { RadioButtons } from "./RadioButtons";
import * as toastMessages from "~/utils/notification/index";
import { InputText } from "./InputText";
import { IconButton } from "@mui/material";
import {
	useAddDepartment,
	useAssignDepartmentToCompany,
	useUpdateDepartment,
} from "~/hooks/useDepartments";
import { useCompanies } from "~/hooks/useCompanies";
import { SelectInput } from "../../_logic/SelectInput";
import { useAuthStore } from "~/store/auth";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const { token } = useAuthStore();

	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);

	const [selectedValue, setSelectedValue] = useState("");
	const { data: dataCompanies, isLoading: isLoadingCompanies } =
		useCompanies(token);

	const nameInputRef = useRef();

	const clearInputs = () => {
		nameInputRef.current.value = "";
	};

	const { mutate: addMutateDepartment } = useAddDepartment(
		setOpen,
		open,
		clearInputs,
		refetch
	);

	const { mutate: updateMutateDepartment } = useUpdateDepartment(
		setOpen,
		open,
		clearInputs,
		refetch
	);
	const { mutate: assignMutateDepartmentToCompany } =
		useAssignDepartmentToCompany(setOpen, open, refetch);

	const submitHandler = (e) => {
		e.preventDefault();

		const name = nameInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (!name) {
					infoMessage("נא למלא את השדה");
				}
				const newDepartment = { name };

				addMutateDepartment(newDepartment, token);
			} else if (open.title === "edit") {
				const updateDepartment = {
					code: info?.code,
					name,
					isActive: radioButtons === "true" ? true : false,
				};
				updateMutateDepartment(updateDepartment, token);
			} else if (open.title === "assign") {
				const assignDepartmentToCompany = {
					departmentCode: info?.code,
					companyCode: selectedValue,
				};

				assignMutateDepartmentToCompany(
					assignDepartmentToCompany,
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
			<span className="block text-center text-2xl mb-2">
				{open.title === "assign"
					? `שיוך מחלקת ${info.name} לחברת:`
					: title}
			</span>

			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title !== "assign" && (
					<InputText
						title={title}
						action={"עריכת נתונים"}
						info={info?.name}
						originalText={"שם מחלקה"}
						ref={nameInputRef}
					/>
				)}
				{open.title === "assign" && (
					<SelectInput
						action={open.title}
						type={"חברות"}
						selectedValue={selectedValue}
						setSelectedValue={setSelectedValue}
						data={dataCompanies?.map(
							({ companyCode, companyName }) => ({
								key: companyCode,
								code: companyCode,
								name: companyName,
							})
						)}
						isLoading={isLoadingCompanies}
					/>
				)}
				{open.title === "edit" && (
					<div className="grid justify-items-center w-full">
						<RadioButtons
							title="פעיל:"
							setRadioButtons={setRadioButtons}
							defaultValue={info?.isActive}
							type={"edit"}
						/>
					</div>
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
