import { Button, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { actionRow } from "~/components/define/_logic/actionRow";
import { useCoupons } from "~/hooks/useCoupons";
import {
	useAddTransaction,
	useEmployeeByUsername,
	useTransactions,
} from "~/hooks/useTransactions";
import { useAuthStore } from "~/store/auth";
import Spinner from "../ui/spinner/Spinner";
import Actions from "./actions/Actions";

const Transactions = () => {
	const { username, logoutStore } = useAuthStore();

	const [info, setInfo] = useState({});
	const [checked, setChecked] = useState(true);
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const handleChange = (e) => {
		setChecked(e.target.checked);
	};

	const { data: employee, isLoading: isLoadingEmployee } =
		useEmployeeByUsername(username);

	const {
		data: transactions,
		refetch,
		isLoading: isLoadingTransactions,
	} = useTransactions(employee?.employeeCode);

	const { mutate: addMutateTransaction } = useAddTransaction(
		setOpen,
		open,
		refetch
	);

	const { data: dataCoupons } = useCoupons();
	const guest = transactions?.some((transaction) => transaction.isGuest);
	const isMealTitle = dataCoupons?.map(
		(coupons) => !!coupons.isMeal && coupons.couponTypeName
	);

	if (isLoadingTransactions || isLoadingEmployee) return <Spinner />;

	return (
		<>
			<div className="flex justify-between p-2">
				<Button
					className="!bg-emerald-700 !text-white hover:!bg-emerald-600 !w-40 !text-sm !m-2 sm:!w-24"
					onClick={() =>
						setOpen({
							...open,
							popUp: true,
							action: true,
							title: "report",
						})
					}
				>
					דוח קופונים
				</Button>
				<Button
					className="!bg-slate-800 !text-white hover:!bg-slate-700 !w-40 !text-sm !m-2 sm:!w-24"
					onClick={() => logoutStore()}
				>
					יציאה
				</Button>
			</div>
			<span className="block text-center text-2xl mt-10">
				ברוך הבא - {employee?.employeeName} 👋
			</span>
			<div className="flex flex-col items-center mt-2">
				<Button
					className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm !m-3"
					onClick={() =>
						addMutateTransaction({
							employeeCode: employee?.employeeCode,
							couponCode: 1,
						})
					}
				>
					הוספת קופון - {isMealTitle}
				</Button>
				<Button
					className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm !m-3"
					onClick={() =>
						setOpen({
							...open,
							popUp: true,
							action: true,
							title: "add-forGuest",
						})
					}
				>
					הוספת קופון - אורח
				</Button>
				<Button
					className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
					onClick={() =>
						setOpen({
							...open,
							popUp: true,
							action: true,
							title: "add-various",
						})
					}
				>
					הוספת קופון - שונות
				</Button>

				<span className="text-xl mt-2">
					{transactions?.length > 0
						? `קופנים פעילים - ${transactions?.length}`
						: `לא קיימים קופונים`}
				</span>
				{guest && (
					<Switch
						checked={checked}
						onChange={handleChange}
						inputProps={{ "aria-label": "controlled" }}
					/>
				)}
			</div>

			{checked ? (
				<div className="grid grid-cols-4 gap-2 justify-between mt-10 lg:flex lg:flex-col">
					{transactions
						?.filter((transaction) => !transaction.isGuest)
						?.map((transaction) => (
							<div
								key={transaction.id}
								className=" max-w-sm p-6 m-3 w-4/5 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-11/12"
							>
								<span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{transaction?.couponName}
								</span>

								<p className="mb-3  font-normal text-gray-700 dark:text-gray-400">
									{transaction?.couponDesc}
								</p>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
									{new Date(
										transaction?.issuedDate
									).toLocaleDateString()}
								</p>
								<a
									className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											transaction,
											"scanner"
										)
									}
								>
									לצפייה בברקוד
								</a>
							</div>
						))}
				</div>
			) : (
				<div className="grid grid-cols-4  gap-2 justify-between mt-10 lg:flex lg:flex-col">
					{transactions
						?.filter((transaction) => transaction.isGuest)
						?.map((transaction) => (
							<div
								key={transaction.id}
								className=" max-w-sm p-6 m-3 w-4/5 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-11/12"
							>
								<span className="text-2xl font-bold tracking-tight text-red-700 dark:text-white">
									{transaction?.isGuest && "אורח"}
								</span>
								<br />
								<span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{transaction?.couponName}
								</span>

								<p className="mb-3  font-normal text-gray-700 dark:text-gray-400">
									{transaction?.couponDesc}
								</p>
								<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
									{new Date(
										transaction?.issuedDate
									).toLocaleDateString()}
								</p>
								<a
									className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											transaction,
											"scanner"
										)
									}
								>
									לצפייה בברקוד
								</a>
							</div>
						))}
				</div>
			)}

			{open.action && (
				<Actions
					open={open}
					setOpen={setOpen}
					info={info}
					refetch={refetch}
					dataEmployee={employee}
				/>
			)}
		</>
	);
};

export default Transactions;
