import {
	Checkbox,
	FormControlLabel,
	IconButton,
	TextField,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMemo, useReducer, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { AutocompleteInput } from "~/components/define/_logic/AutocompleteInput";
import { InputDates } from "~/components/define/_logic/DatesInput";
import { SelectInput } from "~/components/define/_logic/SelectInput";
import { FilterFields } from "~/constants/reports/employees/FilterFields";
import { useCoupons } from "~/hooks/useCoupons";
import { useEmployees } from "~/hooks/useEmployees";
import { useEmployeeReport } from "~/hooks/useReport";
import { useAddForGuest, useAddTransaction } from "~/hooks/useTransactions";
import { getDates } from "~/utils/date";
import * as toastMessages from "~/utils/notification/index";
import { Pdf } from "../report/Pdf";

const initialFiltersReducer = FilterFields.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: false }),
	{}
);
const filterReducer = (state, action) => {
	return { ...state, [action.id]: !state[action.id] };
};

const Form = ({ title, info, setOpen, open, refetch, dataEmployee }) => {
	const [selectedValue, setSelectedValue] = useState("");
	const [showFilters, setShowFilters] = useState(false);

	const [showReport, setShowReport] = useState(false);
	const [forGuest, setForGuest] = useState("false");
	const [inputSearch, setInputSearch] = useState("");

	const [dates, setDates] = useState({
		fromDate: "",
		toDate: "",
	});
	const qtyInputRef = useRef();
	const fromDateInputRef = useRef();
	const toDateInputRef = useRef();

	const { data: dataCoupons, isLoading: isLoadingCoupons } = useCoupons();

	const { mutate: addMutateTransaction } = useAddTransaction(
		setOpen,
		open,
		refetch
	);
	const { mutate: addMutateTransactionForGuest } = useAddForGuest(
		setOpen,
		open,
		refetch
	);
	const { data: dataAllEmployees } = useEmployees();

	const [data, fetchReport] = useEmployeeReport();

	const couponForGuest = dataAllEmployees?.map(
		(employee) =>
			employee.companyName === dataEmployee.companyName && {
				label: employee.employeeName,
				id: employee.employeeCode,
			}
	);

	const [filters, dispatch] = useReducer(
		filterReducer,
		initialFiltersReducer
	);

	const dataResult = useMemo(() => {
		let results = data?.filter((user) =>
			user?.couponName.toLowerCase().includes(inputSearch.toLowerCase())
		);
		results = FilterFields.filter((f) => filters[f.id]).reduce(
			(acc, curr) => curr.apply(acc),
			results
		);

		return results;
	}, [data, filters]);

	const Filters = useMemo(
		() =>
			FilterFields.map((f) => (
				<FormControlLabel
					key={f.id}
					control={
						<Checkbox defaultValue={false} value={filters[f.id]} />
					}
					label={f.name}
					onChange={() => {
						dispatch(f);
					}}
				/>
			)),
		[filters]
	);

	const onCouponForGuest = (value) => {
		setForGuest(value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const fromDate = fromDateInputRef?.current?.value;
		const toDate = toDateInputRef?.current?.value;
		const qty = qtyInputRef?.current?.value;

		setDates({ ...dates, fromDate, toDate });
		try {
			if (open.title === "add-various") {
				if (!selectedValue) {
					toastMessages.infoMessage("???? ?????????? ?????? ??????????.");
				} else {
					const newTransaction = {
						employeeCode: dataEmployee?.employeeCode,
						couponCode: selectedValue,
					};
					addMutateTransaction(newTransaction);
				}
			} else if (open.title === "report") {
				if (!fromDate || !toDate) {
					toastMessages.infoMessage("???? ???????? ???????? ??????????????.");
				} else {
					const reportTransaction = {
						employeeCode: dataEmployee?.employeeCode,
						fromDate,
						toDate,
					};
					fetchReport(reportTransaction);
					setShowReport(true);
				}
			} else if (open.title === "add-forGuest") {
				if (qty <= 0) {
					toastMessages.infoMessage("???? ?????????? ???????? ???????? ?? - 0.");
				} else if (qty > 10) {
					toastMessages.infoMessage(
						"???? ???????? ???????????? ?????? 10 ???????????? ???????????? ??????."
					);
				} else {
					const newTransactionForGuest = {
						employeeCode: dataEmployee.employeeCode,
						toEmployeeCode: forGuest?.id,
						qty,
					};

					addMutateTransactionForGuest(newTransactionForGuest);
				}
			}
		} catch (err) {
			toastMessages.errorMessage(err);
		}
	};
	return (
		<>
			<span className="block text-center text-2xl mb-2 sm:mt-2 sm:text-xl">
				{title}
			</span>

			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				{open.title === "add-various" && (
					<SelectInput
						action={open.title}
						type={"??????"}
						selectedValue={selectedValue}
						setSelectedValue={setSelectedValue}
						data={dataCoupons
							?.filter((coupons) => coupons.couponCode !== 1)
							?.map(
								({ couponCode, couponName, debitAmount }) => ({
									key: couponCode,
									code: couponCode,
									name: `${couponName} - ???${debitAmount}`,
								})
							)}
						isLoading={isLoadingCoupons}
					/>
				)}
				{open.title === "report" && (
					<>
						<div className="flex justify-center items-center ml-5 w-5/6 sm:grid sm:justify-center">
							<label className="text-base ml-2">????????????:</label>
							<InputDates
								title={title}
								action={"?????????? ????????????"}
								ref={fromDateInputRef}
								// It's false because not year and month
								// It's true because an initial date
								defaultValue={getDates(false, true)}
							/>

							<label className="text-base mr-5 mt-5 sm:mr-0">
								???? ??????????:
							</label>
							<InputDates
								title={title}
								action={"?????????? ????????????"}
								ref={toDateInputRef}
								defaultValue={getDates()}
							/>
						</div>
					</>
				)}
				{open.title === "report" && (
					<div className="flex justify-center w-1/5 mt-5">
						<IconButton
							onClick={() => setShowFilters(!showFilters)}
						>
							<FaFilter />
						</IconButton>
					</div>
				)}
				{showFilters && (
					<div className="flex justify-center w-4/5">{Filters}</div>
				)}
				{open.title === "add-forGuest" && (
					<>
						<AutocompleteInput
							options={couponForGuest?.map((employee) => ({
								label: employee.label,
								id: employee.id,
							}))}
							onChange={onCouponForGuest}
							label={"?????????? ???????? ??????????"}
						/>
						<TextField
							className="w-2/5 sm:!w-11/12"
							autoComplete="false"
							label="???????? ??????????????"
							required
							inputRef={qtyInputRef}
						/>
					</>
				)}
			</div>

			<div className="flex items-end flex-col p-2 sm:relative top-28 sm:top-0">
				{open.title !== "report" && (
					<IconButton
						className="!text-white !bg-green-700 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				)}
				{open.title === "report" && (
					<IconButton
						className="!text-white !bg-cyan-600 !text-3xl"
						onClick={submitHandler}
					>
						<MdDone />
					</IconButton>
				)}
			</div>
			{showReport &&
				(dataResult?.length > 0 ? (
					<PDFDownloadLink
						document={
							<Pdf
								title={` ?????? ?????????????? ?????????? - ${dataEmployee?.employeeName}`}
								data={dataResult}
								dates={`${new Date(
									dates.toDate
								).toLocaleDateString()} - ${new Date(
									dates.fromDate
								).toLocaleDateString()}`}
							/>
						}
						filename="CouponReport.pdf"
					>
						{({ loading }) =>
							loading ? (
								<div className="flex justify-center text-xl bg-gray-600 text-white capitalize">
									<button>????????...</button>
								</div>
							) : (
								<>
									<div className="flex justify-center text-xl bg-gray-600 text-white ">
										<button>?????????? ????????</button>
									</div>
								</>
							)
						}
					</PDFDownloadLink>
				) : (
					<div className="flex justify-center text-xl bg-gray-600 text-white capitalize ">
						<span>???? ???????????? ????????????</span>
					</div>
				))}
		</>
	);
};

export default Form;
