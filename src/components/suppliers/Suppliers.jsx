import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useSupplierByUsername } from "~/hooks/useSuppliers";
import { useUpdateTransaction } from "~/hooks/useTransactions";
import { useAuthStore } from "~/store/auth";
import { decrypt } from "~/utils/decrypt";
import Spinner from "../ui/spinner/Spinner";
import Actions from "./actions/Actions";

const Suppliers = () => {
	const [counter, setCounter] = useState(0);
	const [data, setData] = useState("");
	const [error, setError] = useState("");
	const [isError, setIsError] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const { username, logoutStore } = useAuthStore();
	const { data: dataSupplier, isLoading: isLoadingSupplier } =
		useSupplierByUsername(username);

	const {
		mutate: updateMutateTransaction,
		// isError,
		// error,
		isLoading,
	} = useUpdateTransaction(setCounter, setError, setIsError);

	useEffect(() => {
		if (!data || !data === "") return;
		const updated = async () => {
			const updateTransaction = {
				couponNumber: data,
				supplierCode: dataSupplier?.supplierCode,
				supplierUsername: dataSupplier?.username,
			};
			updateMutateTransaction(updateTransaction);
			await delay(5000);
			setError("");
			setIsError(true);
			setData("");
		};
		updated();
	}, [data]);

	if (isLoadingSupplier) return <Spinner />;
	return (
		<>
			<div className="flex justify-between p-1 mb-2">
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
					דוחות
				</Button>
				<Button
					className="!bg-slate-800 !text-white hover:!bg-slate-700 !w-40 !text-sm !m-2 sm:!w-24"
					onClick={() => logoutStore()}
				>
					יציאה
				</Button>
			</div>
			<span className="block text-center text-2xl mb-5">
				ברוכים הבאים - {dataSupplier?.supplierName}👋
			</span>
			<span className="block text-center text-2xl mb-5">
				סריקות: {counter}
			</span>
			<div className="flex justify-center items-center">
				<QrReader
					onResult={(result) => {
						if (!!result?.text) setData(result.text);
					}}
					className="!w-1/4 bg-gray-600 xl:!w-1/2"
				/>
			</div>

			{!isLoading ? (
				<div className="flex flex-col justify-center items-center text-3xl mt-5">
					{isError && <span>{error?.response?.data?.Message}</span>}
					{data === "" && <span>ממתין לסריקה</span>}
					{!isError && !error && (
						<span>
							{data &&
								` נסרק בהצלחה - ${JSON.stringify(
									decrypt(data)?.username?.toString()
								)}`}
						</span>
					)}
				</div>
			) : (
				<div className="flex flex-col justify-center items-center text-3xl mt-5">
					Loading...
				</div>
			)}
			{open.action && (
				<Actions
					open={open}
					setOpen={setOpen}
					dataSupplier={dataSupplier}
				/>
			)}
		</>
	);
};

export default Suppliers;
