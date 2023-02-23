import { useMutation, useQuery } from "react-query";
import {
	addShift,
	deleteShift,
	getShifts,
	updateShift,
} from "~/api/shifts/shifts";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useShifts = () => useQuery([queryKeys.shifts], getShifts);

export const useAddShift = (setOpen, open, refetch, clearInputs) =>
	useMutation(addShift, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateShift = (setOpen, open, refetch) =>
	useMutation(updateShift, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteShift = (setOpen, open, refetch) => {
	return useMutation((shiftCode) => deleteShift(shiftCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
};
