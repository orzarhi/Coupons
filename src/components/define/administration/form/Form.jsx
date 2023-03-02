import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import {
	useAddAdministration,
	useUpdateAdministration,
} from "~/hooks/useAdministrations";
import * as toastMessages from "~/utils/notification/index";
import { InputText } from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);

	const nameInputRef = useRef();

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
					info={info?.name}
					originalText={"שם"}
					ref={nameInputRef}
				/>
				<div className="grid justify-items-center w-full">
					{open.title === "edit" && (
						<RadioButtons
							title={"פעיל:"}
							type={open.title}
							setRadioButtons={setRadioButtons}
							defaultValue={info?.isActive}
						/>
					)}
				</div>
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
