import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useAddUserTypes, useUpdateUserTypes } from "~/hooks/useUsersTypes";
import * as toastMessages from "~/utils/notification/index";
import InputText from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, info, setOpen, open, refetch }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);

	const nameInputRef = useRef();
	const hoursValidityInputRef = useRef();

	const clearInputs = () => {
		nameInputRef.current.value = "";
		hoursValidityInputRef.current.value = "";
	};

	const { mutate: addMutateUserType } = useAddUserTypes(
		setOpen,
		open,
		refetch,
		clearInputs
	);

	const { mutate: updateMutateUserType } = useUpdateUserTypes(
		setOpen,
		open,
		refetch,
		clearInputs
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const name = nameInputRef?.current?.value;
		const hoursValidity = hoursValidityInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (!name || !hoursValidity) {
					infoMessage("נא למלא את כל השדות");
				} else {
					const newUserType = { name, hoursValidity };
					addMutateUserType(newUserType);
				}
			} else if (open.title === "edit") {
				const editUserType = {
					code: info?.code,
					name,
					hoursValidity,
					isActive: radioButtons === "true" ? true : false,
				};
				updateMutateUserType(editUserType);
			}
		} catch (err) {
			toastMessages.errorMessage(err);
		}
	};

	return (
		<>
			<span className="block text-center text-2xl mb-2">{title}</span>
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.name}
					originalText={"שם"}
					ref={nameInputRef}
				/>
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.hoursValidity}
					originalText={"תוקף"}
					ref={hoursValidityInputRef}
				/>
			</div>
			{open?.title === "edit" && (
				<RadioButtons
					title={"פעיל:"}
					setRadioButtons={setRadioButtons}
					defaultValue={info?.isActive}
					type={open?.title}
				/>
			)}
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
