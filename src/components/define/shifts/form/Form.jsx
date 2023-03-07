import { IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import * as toastMessages from "~/utils/notification/index";
import { InputText, InputTextTime } from "./InputText";
import { RadioButtons } from "./RadioButtons";
import { useAddShift, useUpdateShift } from "~/hooks/useShifts";

const Form = ({ title, info, setOpen, open, refetch }) => {
	const [radioButtons, setRadioButtons] = useState({
		isSunday: info?.isSunday?.toString(),
		isMonday: info?.isMonday?.toString(),
		isTuesday: info?.isTuesday?.toString(),
		isWednesday: info?.isWednesday?.toString(),
		isThursday: info?.isThursday?.toString(),
		isFriday: info?.isFriday?.toString(),
		isSaturday: info?.isSaturday?.toString(),
		isWithoutCharge: info?.isWithoutCharge?.toString(),
		isActive: info?.isActive?.toString(),
	});

	const [radioButtonsAdd, setRadioButtonsAdd] = useState({
		isSunday: "true",
		isMonday: "true",
		isTuesday: "true",
		isWednesday: "true",
		isThursday: "true",
		isFriday: "false",
		isSaturday: "false",
		isWithoutCharge: "false",
	});

	const descriptionInputRef = useRef();
	const startTimeInputRef = useRef();
	const endTimeInputRef = useRef();

	const clearInputs = () => {
		startTimeInputRef.current.value = "";
		endTimeInputRef.current.value = "";
		descriptionInputRef.current.value = "";
	};

	const { mutate: addMutateShift } = useAddShift(
		setOpen,
		open,
		clearInputs,
		refetch
	);
	const { mutate: updateMutateShift } = useUpdateShift(
		setOpen,
		open,
		refetch
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const description = descriptionInputRef?.current?.value;
		const startTime = startTimeInputRef?.current?.value;
		const endTime = endTimeInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (!startTime || !endTime) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				} else {
					const newShift = {
						description,
						startTime,
						endTime,
						isSunday:
							radioButtonsAdd.isSunday === "true" ? true : false,
						isMonday:
							radioButtonsAdd.isMonday === "true" ? true : false,
						isTuesday:
							radioButtonsAdd.isTuesday === "true" ? true : false,
						isWednesday:
							radioButtonsAdd.isWednesday === "true"
								? true
								: false,
						isThursday:
							radioButtonsAdd.isThursday === "true"
								? true
								: false,
						isFriday:
							radioButtonsAdd.isFriday === "true" ? true : false,
						isSaturday:
							radioButtonsAdd.isSaturday === "true"
								? true
								: false,
						isWithoutCharge:
							radioButtonsAdd.isWithoutCharge === "true"
								? true
								: false,
					};
					addMutateShift(newShift);
				}
			} else if (open.title === "edit") {
				const updateShift = {
					shiftCode: info?.shiftCode,
					description,
					startTime,
					endTime,
					isSunday: radioButtons.isSunday === "true" ? true : false,
					isMonday: radioButtons.isMonday === "true" ? true : false,
					isTuesday: radioButtons.isTuesday === "true" ? true : false,
					isWednesday:
						radioButtons.isWednesday === "true" ? true : false,
					isThursday:
						radioButtons.isThursday === "true" ? true : false,
					isFriday: radioButtons.isFriday === "true" ? true : false,
					isSaturday:
						radioButtons.isSaturday === "true" ? true : false,
					isWithoutCharge:
						radioButtons.isWithoutCharge === "true" ? true : false,
					isActive: radioButtons.isActive === "true" ? true : false,
				};
				updateMutateShift(updateShift);
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
					info={info?.description}
					originalText={"משמרת"}
					ref={descriptionInputRef}
				/>
				<InputTextTime
					title={title}
					action={"עריכת נתונים"}
					info={info?.startTime}
					originalText={"התחלת משמרת"}
					ref={startTimeInputRef}
				/>
				<InputTextTime
					title={title}
					action={"עריכת נתונים"}
					info={info?.endTime}
					originalText={"סיום משמרת"}
					ref={endTimeInputRef}
				/>

				<RadioButtons
					title={"יום ראשון:"}
					identification={"sunday"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isSunday
							: radioButtonsAdd.isSunday
					}
					type={open?.title}
				/>
				<RadioButtons
					title={"יום שני:"}
					identification={"monday"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isMonday
							: radioButtonsAdd.isMonday
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
				/>
				<RadioButtons
					title={"יום שלישי:"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isTuesday
							: radioButtonsAdd.isTuesday
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
					identification={"tuesday"}
				/>
				<RadioButtons
					title={"יום רביעי:"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isWednesday
							: radioButtonsAdd.isWednesday
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
					identification={"wednesday"}
				/>
				<RadioButtons
					title={"יום חמישי:"}
					setRadioButtons={setRadioButtons}
					defaultValue={
						open.title === "edit"
							? info?.isThursday
							: radioButtonsAdd.isThursday
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
					identification={"thursday"}
				/>
				<RadioButtons
					title={"יום שישי:"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isFriday
							: radioButtonsAdd.isFriday
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
					identification={"friday"}
				/>
				<RadioButtons
					title={"יום שבת:"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isSaturday
							: radioButtonsAdd.isSaturday
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
					identification={"saturday"}
				/>
				<RadioButtons
					title={"ללא גביה מעובד מורשה:"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={
						open.title === "edit"
							? info?.isWithoutCharge
							: radioButtonsAdd.isWithoutCharge
					}
					radioButtons={
						open.title === "edit" ? radioButtons : radioButtonsAdd
					}
					type={open?.title}
					identification={"withoutCharge"}
				/>
			</div>

			{open?.title === "edit" && (
				<RadioButtons
					title={"פעיל:"}
					setRadioButtons={
						open.title === "edit"
							? setRadioButtons
							: setRadioButtonsAdd
					}
					defaultValue={info?.isActive}
					type={open?.title}
					identification={"active"}
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
