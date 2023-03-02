import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useCompanies } from "~/hooks/useCompanies";
import {
	useAddCoupon,
	useAssignCouponToCompany,
	useAssignCouponToSupplier,
	useUpdateCoupon,
} from "~/hooks/useCoupons";
import { useSuppliers } from "~/hooks/useSuppliers";
import { useAuthStore } from "~/store/auth";
import * as toastMessages from "~/utils/notification/index";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import { InputText } from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const { token } = useAuthStore();

	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);
	const [radioButtonsAssign, setRadioButtonsAssign] = useState("");
	const [radioButtonsCouponType, setRadioButtonsCouponType] = useState("");
	const [selectedValueSuppliers, setSelectedValueSuppliers] = useState("");
	const [selectedValueCompany, setSelectedValueCompany] = useState("");

	const couponNameInputRef = useRef();
	const couponDescInputRef = useRef();
	const debitAmountInputRef = useRef();
	const experationHoursInputRef = useRef();
	const supplierPriceInputRef = useRef();

	const clearInputs = () => {
		couponNameInputRef.current.value = "";
		couponDescInputRef.current.value = "";
		debitAmountInputRef.current.value = "";
		supplierPriceInputRef.current.value = "";
		experationHoursInputRef.current.value = "";
	};

	const { data: dataSuppliers } = useSuppliers(token);

	const { data: dataCompanies } = useCompanies(token);

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

	const { mutate: assignMutateCouponToSupplier } = useAssignCouponToSupplier(
		setOpen,
		open,
		refetch
	);

	const onSupplierAtuoCompleteChange = (value) => {
		setSelectedValueSuppliers(value);
	};
	const onCompanyAtuoCompleteChange = (value) => {
		setSelectedValueCompany(value);
	};
	const submitAddHandler = async (e) => {
		e.preventDefault();

		const couponName = couponNameInputRef?.current?.value;
		const couponDesc = couponDescInputRef?.current?.value;
		const debitAmount = debitAmountInputRef?.current?.value;
		const experationHours = experationHoursInputRef?.current?.value;
		const supplierPrice = supplierPriceInputRef?.current?.value;

		try {
			if (open.title === "add") {
				if (
					!couponName ||
					!couponDesc ||
					!debitAmount ||
					!experationHours ||
					!supplierPrice ||
					!selectedValueSuppliers
				) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				} else {
					const newCoupon = {
						couponName,
						couponDesc,
						debitAmount,
						couponType: radioButtonsCouponType === "true" ? 2 : 1,
						experationHours,
						supplierCode: selectedValueSuppliers?.id,
						supplierPrice,
					};
					addMutateCoupon(newCoupon, token);
				}
			} else if (open.title === "edit") {
				const editCoupon = {
					couponCode: info?.couponCode,
					couponName,
					couponDesc,
					debitAmount,
					couponType,
					experationHours,
					supplierCode,
					isActive: radioButtons === "false" ? true : false,
				};

				updateMutateCoupon(editCoupon, token);
			} else if (
				open.title === "assign" &&
				radioButtonsAssign === "true"
			) {
				const assignCouponToCompany = {
					couponCode: info?.couponCode,
					companyCode: selectedValueCompany?.id,
				};
				assignMutateCouponToCompany(assignCouponToCompany, token);
			} else if (
				open.title === "assign" &&
				radioButtonsAssign === "false"
			) {
				const assignCouponToSupplier = {
					supplierCode: selectedValueSuppliers.id,
					couponCode: info?.couponCode,
					supplierPrice: debitAmount,
				};
				assignMutateCouponToSupplier(assignCouponToSupplier, token);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת");
		}
	};
	const dataResuls = dataSuppliers?.filter(
		(suppliers) => suppliers.isMeals.toString() !== radioButtonsCouponType
	);

	return (
		<>
			<span className="block text-center text-2xl mb-2">{title}</span>

			{open.title === "add" && (
				<div className="w-full flex justify-center items-center">
					<RadioButtons
						defaultValue={null}
						title={"קופון:"}
						firstLabel={"שונות"}
						secondeLabel={"אוכל"}
						setRadioButtons={setRadioButtonsCouponType}
					/>
				</div>
			)}
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title === "assign" ? (
					<>
						<div className="w-3/5 flex justify-center">
							<RadioButtons
								firstLabel={"לחברה"}
								secondeLabel={"לספק"}
								title={"שיוך:"}
								setRadioButtons={setRadioButtonsAssign}
							/>
						</div>
						{radioButtonsAssign === "true" && (
							<AutocompleteInput
								options={dataCompanies?.map((companie) => ({
									label: companie.companyName,
									id: companie.companyCode,
								}))}
								onChange={onCompanyAtuoCompleteChange}
								label={"חברות"}
							/>
						)}
						{radioButtonsAssign === "false" && (
							<>
								<AutocompleteInput
									options={dataSuppliers?.map((supplier) => ({
										label: supplier.supplierName,
										id: supplier.supplierCode,
									}))}
									onChange={onSupplierAtuoCompleteChange}
									label={"ספקים"}
								/>

								<InputText
									title={title}
									action={"עריכת נתונים"}
									info={info?.debitAmount}
									originalText={"סכום החיוב"}
									ref={debitAmountInputRef}
								/>
							</>
						)}
					</>
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
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.experationHours}
							originalText={"תוקף"}
							ref={experationHoursInputRef}
						/>

						{open.title === "add" && (
							<>
								<AutocompleteInput
									options={dataResuls?.map((supplier) => ({
										label: supplier.supplierName,
										id: supplier.supplierCode,
									}))}
									onChange={onSupplierAtuoCompleteChange}
									label={"ספקים"}
								/>
								<InputText
									title={title}
									action={"עריכת נתונים"}
									info={info?.experationDays}
									originalText={"מחיר ספק"}
									ref={supplierPriceInputRef}
								/>
							</>
						)}

						{open.title === "edit" && (
							<div className="w-3/5 flex justify-center">
								<RadioButtons
									defaultValue={info?.isActive}
									title={"פעיל:"}
									setRadioButtons={setRadioButtonsCouponType}
								/>
							</div>
						)}
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

{
	/* <InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.supplierPrice}
					originalText={"מחיר ספק"}
					ref={supplierPriceInputRef}
				/> */
}
{
	/* <InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.couponTypeName}
							originalText={"סוג"}
							ref={couponTypeInputRef}
						/> */
}
