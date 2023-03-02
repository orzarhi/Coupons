import { useMutation, useQuery } from "react-query";
import {
	addAdministration,
	deleteAdministration,
	getAdministrations,
	updateAdministration,
} from "~/api/administrations/administrations";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useAdministrations = () =>
	useQuery([queryKeys.administrations], getAdministrations);

export const useAddAdministration = (setOpen, open, refetch, clearInputs) =>
	useMutation(addAdministration, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateAdministration = (setOpen, open, refetch) =>
	useMutation(updateAdministration, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteAdministration = (setOpen, open, refetch) =>
	useMutation((code) => deleteAdministration(code), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
