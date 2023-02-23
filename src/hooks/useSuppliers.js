import { useMutation, useQuery } from "react-query";
import {
	addSupplier,
	deleteSupplier,
	getSupplierByUserName,
	getSuppliers,
	updateSupplier,
} from "~/api/suppliers/suppliers";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useSuppliers = () => useQuery([queryKeys.suppliers], getSuppliers);

export const useSupplierByUsername = (username) =>
	useQuery(
		[queryKeys.supplierByName],
		() => getSupplierByUserName(username),
		{ enabled: !!username }
	);

export const useAddSupplier = (setOpen, open, refetch, clearInputs) =>
	useMutation(addSupplier, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateSupplier = (setOpen, open, refetch) =>
	useMutation(updateSupplier, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteSupplier = (setOpen, open, refetch) =>
	useMutation((supplierCode) => deleteSupplier(supplierCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
