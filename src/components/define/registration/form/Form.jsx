import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useUpdateUser } from "~/hooks/useUsers";
import * as toastMessages from "~/utils/notification/index";
import { InputText } from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, info, setOpen, open, refetch }) => {
	const [radioButtons, setRadioButtons] = useState({
		isActive: info?.isActive?.toString(),
		isSysAdmin: info?.isSysAdmin?.toString(),
	});

	const passwordInputRef = useRef();

	const { mutate: updateMutateUser } = useUpdateUser(setOpen, open, refetch);

	const submitHandler = async (e) => {
		e.preventDefault();

		const password = passwordInputRef?.current?.value;

		try {
			if (open.title === "edit") {
				const updateUser = {
					username: info?.username,
					password,
					isActive: radioButtons.isActive === "true" ? true : false,
					isSysAdmin:
						radioButtons.isSysAdmin === "true" ? true : false,
					type: info?.type,
				};
				updateMutateUser(updateUser);
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
					readOnly={true}
				/>
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.password}
					originalText={"סיסמא"}
					ref={passwordInputRef}
				/>
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.typeDescription}
					originalText={"סוג"}
					readOnly={true}
				/>
				<div className="grid justify-items-center w-full">
					<RadioButtons
						title={"פעיל:"}
						identification={"active"}
						setRadioButtons={setRadioButtons}
						radioButtons={radioButtons}
						defaultValue={info?.isActive}
						type={open?.title}
					/>
					<RadioButtons
						title={"הרשאת מנהל מערכת:"}
						identification={"sysAdmin"}
						setRadioButtons={setRadioButtons}
						radioButtons={radioButtons}
						defaultValue={info?.isSysAdmin}
						type={open?.title}
					/>
				</div>
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
