import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useCompanies } from "~/hooks/useCompanies";
import {
	useAddCoupon,
	useAssignCouponToCompany,
	useUpdateCoupon,
} from "~/hooks/useCoupons";
import * as toastMessages from "~/utils/notification/index";
import { SelectInput } from "../../_logic/SelectInput";

import InputText from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);
	const [selectedValue, setSelectedValue] = useState("");

	const couponNameInputRef = useRef();
	const couponDescInputRef = useRef();
	const debitAmountInputRef = useRef();
	const couponTypeInputRef = useRef();
	const experationHoursInputRef = useRef();

	const clearInputs = () => {
		couponNameInputRef.current.value = "";
		couponDescInputRef.current.value = "";
		debitAmountInputRef.current.value = "";
		// supplierPriceInputRef.current.value = "";
		couponTypeInputRef.current.value = "";
		experationHoursInputRef.current.value = "";
	};

	const { data: dataCompanies, isLoading: isLoadingCompanies } =
		useCompanies();

	const { mutate: addMutateCoupon } = useAddCoupon(
		setOpen,
		open,
		clearInputs,
		refetch
	);

	const { mutate: updateMutateCoupon } = useUpdateCoupon(
		setOpen,
		open,
		refetch
	);

	const { mutate: assignMutateCouponToCompany } = useAssignCouponToCompany(
		setOpen,
		open,
		refetch
	);

	const submitAddHandler = async (e) => {
		e.preventDefault();

		const couponName = couponNameInputRef?.current?.value;
		const couponDesc = couponDescInputRef?.current?.value;
		const debitAmount = debitAmountInputRef?.current?.value;
		const couponType = couponTypeInputRef?.current?.value;
		const experationHours = experationHoursInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (
					!couponName ||
					!couponDesc ||
					!debitAmount ||
					!couponType ||
					!experationHours
				) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				}
				const newCoupon = {
					couponName,
					couponDesc,
					debitAmount,
					couponType,
					experationHours,
				};

				addMutateCoupon(newCoupon);
			} else if (open.title === "edit") {
				const editCoupon = {
					couponCode: info?.couponCode,
					couponName,
					couponDesc,
					debitAmount,
					couponType,
					experationDays: experationHours,
					supplierCode,
					isActive: radioButtons === "false" ? true : false,
				};

				updateMutateCoupon(editCoupon);
			} else if (open.title === "assign") {
				const assignCouponToCompany = {
					couponCode: info?.couponCode,
					companyCode: selectedValue,
				};
				assignMutateCouponToCompany(assignCouponToCompany);
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
				{/* <InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.couponCode}
					originalText={"קוד"}
					ref={couponCodeInputRef}
				/> */}
				{open.title === "assign" ? (
					<SelectInput
						action={open.title}
						type={"הנהלה"}
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
				) : (
					<>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.couponName}
							originalText={"שם"}
							ref={couponNameInputRef}
						/>

						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.couponDesc}
							originalText={"תיאור"}
							ref={couponDescInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.debitAmount}
							originalText={"סכום החיוב"}
							ref={debitAmountInputRef}
						/>
						{/* <InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.supplierPrice}
					originalText={"מחיר ספק"}
					ref={supplierPriceInputRef}
				/> */}
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.couponTypeName}
							originalText={"סוג"}
							ref={couponTypeInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.experationDays}
							originalText={"תוקף"}
							ref={experationHoursInputRef}
						/>

						<div className="grid justify-items-center w-full">
							{title === "עריכת נתונים" && (
								<RadioButtons
									title={"פעיל:"}
									setRadioButtons={setRadioButtons}
								/>
							)}
						</div>
					</>
				)}
			</div>
			<div className="flex items-end flex-col p-2">
				{open.title === "add" ? (
					<IconButton
						className="!text-white !bg-green-700 !text-3xl"
						onClick={submitAddHandler}
					>
						<MdDone />
					</IconButton>
				) : (
					<IconButton
						className="!text-white !bg-cyan-600 !text-3xl"
						onClick={submitAddHandler}
					>
						<MdDone />
					</IconButton>
				)}
			</div>
		</>
	);
};

export default Form;
