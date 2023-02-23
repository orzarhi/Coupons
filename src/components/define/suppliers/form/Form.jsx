import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useAddSupplier, useUpdateSupplier } from "~/hooks/useSuppliers";
import { PersonType } from "~/constants/PersonType";
import * as toastMessages from "~/utils/notification/index";
import InputText from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState({
		isActive: info?.isActive?.toString(),
		isMeals: info?.isMeals?.toString(),
		isVarious: info?.isVarious?.toString(),
	});

	const [addRadioButtons, setAddRadioButtons] = useState({
		isMeals: "",
		isVarious: "",
	});

	const emailInputRef = useRef();
	const phoneNumberInputRef = useRef();
	const businessNumberInputRef = useRef();
	const supplierNameInputRef = useRef();
	const usernameInputRef = useRef();
	const passwordInputRef = useRef();

	const clearInputs = () => {
		emailInputRef.current.value = "";
		phoneNumberInputRef.current.value = "";
		businessNumberInputRef.current.value = "";
		supplierNameInputRef.current.value = "";
		usernameInputRef.current.value = "";
		passwordInputRef.current.value = "";
	};
	const { mutate: addMutateSupplier } = useAddSupplier(
		setOpen,
		open,
		refetch,
		clearInputs
	);

	const { mutate: updateMutateSupplier } = useUpdateSupplier(
		setOpen,
		open,
		refetch
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const email = emailInputRef?.current?.value;
		const phoneNumber = phoneNumberInputRef?.current?.value;
		const businessNumber = businessNumberInputRef?.current?.value;
		const supplierName = supplierNameInputRef?.current?.value;
		const username = usernameInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (
					!email ||
					!phoneNumber ||
					!businessNumber ||
					!supplierName ||
					!username ||
					!password ||
					!addRadioButtons.isMeals ||
					!addRadioButtons.isVarious
				) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				} else {
					const newSupplier = {
						email,
						phoneNumber,
						businessNumber,
						supplierName,
						username,
						password,
						type: PersonType.SUPPLIER.id,
						isMeals:
							addRadioButtons.isMeals === "true" ? true : false,
						isVarious:
							addRadioButtons.isVarious === "true" ? true : false,
					};
					addMutateSupplier(newSupplier);
				}
			} else if (open.title === "edit") {
				const updateSupplier = {
					supplierCode: info?.supplierCode,
					email,
					phoneNumber,
					businessNumber,
					supplierName,
					username,
					isActive: radioButtons.isActive === "true" ? true : false,
					isMeals: radioButtons.isMeals === "true" ? true : false,
					isVarious: radioButtons.isVarious === "true" ? true : false,
				};

				updateMutateSupplier(updateSupplier);
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
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.username}
					originalText={"שם משתמש"}
					ref={usernameInputRef}
				/>
				{open.title === "add" && (
					<>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.password}
							originalText={"סיסמא"}
							ref={passwordInputRef}
						/>
					</>
				)}
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.supplierName}
					originalText={"שם ספק"}
					ref={supplierNameInputRef}
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
					originalText={"מספר פלאפון"}
					ref={phoneNumberInputRef}
				/>
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.businessNumber}
					originalText={"ח.פ"}
					ref={businessNumberInputRef}
				/>

				{open.title === "add" && (
					<>
						<RadioButtons
							title={"ספק ארוחות:"}
							identification={"meals"}
							setRadioButtons={setAddRadioButtons}
							radioButtons={addRadioButtons}
							// defaultValue={info?.isMeals}
							type={open.title}
						/>
						<RadioButtons
							title={"ספק שונות:"}
							identification={"various"}
							setRadioButtons={setAddRadioButtons}
							radioButtons={addRadioButtons}
							// defaultValue={info?.isVarious}
							type={open.title}
						/>
					</>
				)}
				<div className="flex flex-wrap justify-center w-full gap-12">
					{open.title === "edit" && (
						<>
							<RadioButtons
								title={"פעיל:"}
								identification={"active"}
								setRadioButtons={setRadioButtons}
								radioButtons={radioButtons}
								defaultValue={info?.isActive}
								type={open.title}
							/>
							<RadioButtons
								title={"ספק ארוחות:"}
								identification={"meals"}
								setRadioButtons={setRadioButtons}
								radioButtons={radioButtons}
								defaultValue={info?.isMeals}
								type={open.title}
							/>
							<RadioButtons
								title={"ספק שונות:"}
								identification={"various"}
								setRadioButtons={setRadioButtons}
								radioButtons={radioButtons}
								defaultValue={info?.isVarious}
								type={open.title}
							/>
						</>
					)}

					{/* 
					<RadioButtons
						title={"זכאי למימוש ללא חיוב:"}
						identification={"canUseInFreeShift"}
						setRadioButtons={setRadioButtons}
						radioButtons={radioButtons}
						defaultValue={info?.isCanUseInFreeShift}
						type={open.title}
					/>
					<RadioButtons
						title={"מנהל מינהל:"}
						identification={"administrationAdmin"}
						setRadioButtons={setRadioButtons}
						radioButtons={radioButtons}
						defaultValue={info?.isAdministrationAdmin}
						type={open.title}
					/> */}
				</div>
			</div>
			<div className="flex items-end flex-col p-2">
				{open.title === "add" && (
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
