import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useAddCouponType, useUpdateCouponType } from "~/hooks/useCouponsTypes";
import * as toastMessages from "~/utils/notification/index";
import InputText from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(info?.isMeal?.toString());
	const [newRadioButtons, setNewRadioButtons] = useState("true");

	const couponTypeCodeInputRef = useRef();
	const couponTypeNameInputRef = useRef();

	const clearInputs = () => {
		couponTypeCodeInputRef.current.value = "";
		couponTypeNameInputRef.current.value = "";
	};

	const { mutate: addMutateCouponType } = useAddCouponType(
		setOpen,
		open,
		clearInputs,
		refetch
	);

	const { mutate: updateMutateCouponType } = useUpdateCouponType(
		setOpen,
		open,
		refetch
	);

	const submitHandler = (e) => {
		e.preventDefault();

		const couponTypeCode = couponTypeCodeInputRef?.current?.value;
		const couponTypeName = couponTypeNameInputRef?.current?.value;

		try {
			if (!couponTypeCode || !couponTypeName) {
				infoMessage("נא למלא את כל השדות");
			} else if (open.title === "add") {
				const newCoupon = {
					couponTypeCode,
					couponTypeName,
					isMeal: newRadioButtons === "true" ? true : false,
				};

				addMutateCouponType(newCoupon);
			} else if (open.title === "edit") {
				const editCouponType = {
					couponTypeCode,
					couponTypeName,
					isMeal: radioButtons === "true" ? true : false,
				};

				updateMutateCouponType(editCouponType);
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
					info={info?.couponTypeCode}
					originalText={"סוג"}
					ref={couponTypeCodeInputRef}
				/>
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.couponTypeName}
					originalText={"שם"}
					ref={couponTypeNameInputRef}
				/>
				<div className="grid justify-items-center w-full">
					{open.title === "add" ? (
						<RadioButtons
							title={"ארוחה:"}
							setRadioButtons={setNewRadioButtons}
							defaultValue={info?.isMeal}
							type={open.title}
						/>
					) : (
						<RadioButtons
							title={"ארוחה:"}
							setRadioButtons={setRadioButtons}
							defaultValue={info?.isMeal}
							type={open.title}
						/>
					)}
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
