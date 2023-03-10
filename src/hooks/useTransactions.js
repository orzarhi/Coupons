import { useMutation, useQuery } from "react-query";
import {
	addCouponQr,
	addCouponQrForGuest,
	getEmployeeByUsername,
	getTransactions,
	updateCouponQr,
} from "~/api/transactions/transactions";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";
import * as toastMessages from "~/utils/notification/index";
import incorrect from "~/assets/sounds/incorrect.mp3";
import correct from "~/assets/sounds/correct.mp3";

export const useTransactions = (employeeCode) =>
	useQuery([queryKeys.transactions], () => getTransactions(employeeCode), {
		enabled: !!employeeCode,
	});

export const useEmployeeByUsername = (username) =>
	useQuery(
		[queryKeys.employeeByName, username],
		() => getEmployeeByUsername(username),
		{
			enabled: !!username && username?.length > 0,
		}
	);

export const useAddTransaction = (setOpen, open, refetch) =>
	useMutation(addCouponQr, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useAddForGuest = (setOpen, open, refetch) =>
	useMutation(addCouponQrForGuest, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateTransaction = (setCounter, setError, setIsError) =>
	useMutation(updateCouponQr, {
		onSuccess: (data) => {
			setCounter((prev) => prev + 1);
			new Audio(correct).play();
			toastMessages.successMessage(data.Message);
		},
		onError: (data) => {
			setIsError(true);
			setError(data);
			new Audio(incorrect).play();
			error(data);
		},
	});
