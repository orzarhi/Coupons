import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { MdDone } from "react-icons/md";
import { useAdministrations } from "~/hooks/useAdministrations";
import {
	useAddCompany,
	useAssignCompanyToAdministration,
	useUpdateCompany,
} from "~/hooks/useCompanies";
import * as toastMessages from "~/utils/notification/index";
import { AutocompleteInput } from "../../_logic/AutocompleteInput";
import { InputText } from "./InputText";
import { RadioButtons } from "~/components/define/_logic/RadioButtons";
import {
	useAssignDepartmentToCompany,
	useDepartments,
} from "~/hooks/useDepartments";
import { useAssignCouponToCompany, useCoupons } from "~/hooks/useCoupons";

const Form = ({ title, refetch, info, setOpen, open }) => {
	const [radioButtons, setRadioButtons] = useState(
		info?.isActive?.toString()
	);
	const [selectedAdministrations, setSelectedAdministrations] = useState("");
	const [selectedDepartments, setSelectedDepartments] = useState("");
	const [selectedCoupons, setSelectedCoupons] = useState("");

	const { data: dataAdministrations, isLoading: isLoadingAdministrations } =
		useAdministrations();

	const { data: dataDepartments, isLoading: isLoadingDepartments } =
		useDepartments();

	const { data: dataCoupons, isLoading: isLoadingCoupons } = useCoupons();

	const companyNameInputRef = useRef();
	const emailInputRef = useRef();
	const phoneNumberInputRef = useRef();
	const logoFileInputRef = useRef();

	const clearInputs = () => {
		companyNameInputRef.current.value = "";
		emailInputRef.current.value = "";
		phoneNumberInputRef.current.value = "";
		logoFileInputRef.current.value = "";
	};

	const { mutate: addMutateCompany } = useAddCompany(
		setOpen,
		open,
		clearInputs,
		refetch
	);
	const { mutate: updateMutateCompany } = useUpdateCompany(
		setOpen,
		open,
		refetch
	);
	const { mutate: assignMutateCompanyToAdministration } =
		useAssignCompanyToAdministration(setOpen, open, refetch);

	const { mutate: assignMutateDepartmentToCompany } =
		useAssignDepartmentToCompany(setOpen, open, refetch);

	const { mutate: assignMutateCouponToCompany } = useAssignCouponToCompany(
		setOpen,
		open,
		refetch
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const companyName = companyNameInputRef?.current?.value;
		const email = emailInputRef?.current?.value;
		const phoneNumber = phoneNumberInputRef?.current?.value;
		const logoFile = logoFileInputRef?.current?.value;
		try {
			if (open.title === "add") {
				if (!companyName || !email || !phoneNumber || !logoFile) {
					toastMessages.infoMessage("נא למלא את כל השדות");
				} else {
					const newCompany = {
						companyName,
						email,
						phoneNumber,
						logoFile,
					};

					addMutateCompany(newCompany);
				}
			} else if (open.title === "edit") {
				const updateCompany = {
					companyCode: info?.companyCode,
					companyName,
					email,
					phoneNumber,
					logoFile,
					isActive: radioButtons === "true" ? true : false,
				};

				updateMutateCompany(updateCompany);
			} else if (open.title === "assignAdministrationToCompanies") {
				const assignCompanyToAdministration = {
					companyCode: info?.companyCode,
					administrationCode: selectedAdministrations.id,
				};

				assignMutateCompanyToAdministration(
					assignCompanyToAdministration
				);
			} else if (open.title === "assignCompanieToDepartment") {
				const assignCompanyToDepartment = {
					companyCode: info?.companyCode,
					departmentCode: selectedDepartments.id,
				};

				assignMutateDepartmentToCompany(assignCompanyToDepartment);
			} else if (open.title === "assignCompanieToCoupon") {
				const assignCompanyToCoupon = {
					companyCode: info?.companyCode,
					couponCode: selectedCoupons.id,
				};

				assignMutateCouponToCompany(assignCompanyToCoupon);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessages.errorMessage(error);
			else toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת");
		}
	};

	const onAdministrationsAtuoCompleteChange = (value) => {
		setSelectedAdministrations(value);
	};
	const onDepartmentsAtuoCompleteChange = (value) => {
		setSelectedDepartments(value);
	};
	const onCouponsAtuoCompleteChange = (value) => {
		setSelectedCoupons(value);
	};
	return (
		<>
			<span className="block text-center text-2xl mb-2">{title}</span>
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title === "add" || open.title === "edit" ? (
					<>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.companyName}
							originalText={"שם"}
							ref={companyNameInputRef}
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
							originalText={"מספר טלפון"}
							ref={phoneNumberInputRef}
						/>
						<InputText
							title={title}
							action={"עריכת נתונים"}
							info={info?.logoFile}
							originalText={"לוגו"}
							ref={logoFileInputRef}
						/>
					</>
				) : null}
				{open.title === "assignAdministrationToCompanies" && (
					<>
						<AutocompleteInput
							options={dataAdministrations?.map(
								(administrations) => ({
									label: administrations.name,
									id: administrations.code,
								})
							)}
							onChange={onAdministrationsAtuoCompleteChange}
							isLoading={isLoadingAdministrations}
							label={"הנהלות"}
						/>
					</>
				)}
				{open.title === "assignCompanieToDepartment" && (
					<>
						<AutocompleteInput
							options={dataDepartments?.map((department) => ({
								label: department.name,
								id: department.code,
							}))}
							onChange={onDepartmentsAtuoCompleteChange}
							isLoading={isLoadingDepartments}
							label={"מחלקות"}
						/>
					</>
				)}
				{open.title === "assignCompanieToCoupon" && (
					<>
						<AutocompleteInput
							options={dataCoupons?.map((coupon) => ({
								label: coupon.couponName,
								id: coupon.couponCode,
							}))}
							onChange={onCouponsAtuoCompleteChange}
							isLoading={isLoadingCoupons}
							label={"קופונים"}
						/>
					</>
				)}

				<div className="grid justify-items-center w-full">
					{open.title === "edit" && (
						<RadioButtons
							title={"פעיל:"}
							setRadioButtons={setRadioButtons}
							type={info?.isActive}
						/>
					)}
				</div>
			</div>
			<div className="flex items-end flex-col p-2">
				{open.title !== "edit" ? (
					<IconButton
						className="!text-white !bg-green-700 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				) : (
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
