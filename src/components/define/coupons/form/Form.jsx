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
import { useCouponsTypes } from "~/hooks/useCouponsTypes";
import { useSuppliers } from "~/hooks/useSuppliers";
import * as toastMessages from "~/utils/notification/index";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import { InputText } from "./InputText";
import { RadioButtons } from "./RadioButtons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);
	const [radioButtonsAssign, setRadioButtonsAssign] = useState("");
	const [radioButtonsCouponType, setRadioButtonsCouponType] = useState("");
	const [selectedValueSuppliers, setSelectedValueSuppliers] = useState("");
	const [selectedValueCompany, setSelectedValueCompany] = useState("");

	const [selecteCouponType, setSelecteCouponType] = useState("");

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

	const { data: dataSuppliers, isLoading: isLoadingSuppliers } =
		useSuppliers();

	const { data: dataCompanies, isLoading: isLoadingCompanies } =
		useCompanies();

	const { mutate: addMutateCoupon } = useAddCoupon(
		setOpen,
		open,
		clearInputs,
		refetch
	);
	const { data: dataCouponsTypes, isLoading: isLoadingCouponsTypes } =
		useCouponsTypes();

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
	const onCouponsTypes = (value) => {
		setSelecteCouponType(value);
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
					toastMessages.infoMessage("???? ???????? ???? ???? ??????????");
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
					addMutateCoupon(newCoupon);
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

				updateMutateCoupon(editCoupon);
			} else if (open.title === "assignCompanieToCoupon") {
				const assignCouponToCompany = {
					couponCode: info?.couponCode,
					companyCode: selectedValueCompany?.id,
				};
				assignMutateCouponToCompany(assignCouponToCompany);
			} else if (open.title === "assignSuppliersToCoupon") {
				const assignCouponToSupplier = {
					supplierCode: selectedValueSuppliers.id,
					couponCode: info?.couponCode,
					supplierPrice: debitAmount,
				};
				assignMutateCouponToSupplier(assignCouponToSupplier);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("??????????: ?????????? ?????????????? ????????");
		}
	};
	const dataResuls = dataSuppliers?.filter(
		(suppliers) => suppliers.isMeals.toString() !== radioButtonsCouponType
	);

	const selectedIsMeals = dataCouponsTypes?.find(
		(couponsTypes) =>
			couponsTypes?.couponTypeName === selecteCouponType?.label &&
			couponsTypes?.isMeal
	);

	return (
		<>
			<span className="block text-center text-2xl mb-2">{title}</span>

			{open.title === "add" && (
				<div className="w-full flex justify-center items-center mt-5">
					<AutocompleteInput
						options={dataCouponsTypes?.map((couponsType) => ({
							label: couponsType.couponTypeName,
							id: couponsType.couponTypeCode,
						}))}
						onChange={onCouponsTypes}
						isLoading={isLoadingCouponsTypes}
						label={"??????????????"}
					/>
				</div>
			)}
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title === "assignCompanieToCoupon" && (
					<AutocompleteInput
						options={dataCompanies?.map((companie) => ({
							label: companie.companyName,
							id: companie.companyCode,
						}))}
						onChange={onCompanyAtuoCompleteChange}
						isLoading={isLoadingCompanies}
						label={"??????????"}
					/>
				)}
				{open.title === "assignSuppliersToCoupon" && (
					<>
						<AutocompleteInput
							options={dataSuppliers?.map((supplier) => ({
								label: supplier.supplierName,
								id: supplier.supplierCode,
							}))}
							onChange={onSupplierAtuoCompleteChange}
							label={"??????????"}
						/>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.debitAmount}
							originalText={"???????? ??????????"}
							ref={debitAmountInputRef}
						/>
					</>
				)}

				{open.title === "add" || open.title === "edit" ? (
					<>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.couponName}
							originalText={"????"}
							ref={couponNameInputRef}
						/>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.couponDesc}
							originalText={"??????????"}
							ref={couponDescInputRef}
						/>

						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.experationHours}
							originalText={"???????? ??????????"}
							ref={experationHoursInputRef}
						/>
						<InputText
							title={title}
							action={"?????????? ????????????"}
							info={info?.debitAmount}
							originalText={"???????? ?????????? ??????????"}
							ref={debitAmountInputRef}
						/>

						{open.title === "add" && (
							<>
								<InputText
									title={title}
									action={"?????????? ????????????"}
									info={info?.experationDays}
									originalText={"???????? ?????????? ??????"}
									ref={supplierPriceInputRef}
								/>
								{!selectedIsMeals?.isMeal && (
									<AutocompleteInput
										options={dataResuls?.map(
											(supplier) => ({
												label: supplier.supplierName,
												id: supplier.supplierCode,
											})
										)}
										onChange={onSupplierAtuoCompleteChange}
										isLoading={isLoadingSuppliers}
										label={"??????????"}
									/>
								)}
							</>
						)}

						{open.title === "edit" && (
							<div className="w-3/5 flex justify-center">
								<RadioButtons
									defaultValue={info?.isActive}
									title={"????????:"}
									setRadioButtons={setRadioButtons}
								/>
							</div>
						)}
					</>
				) : null}
			</div>
			<div className="flex items-end flex-col p-2">
				{open.title !== "edit" ? (
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
