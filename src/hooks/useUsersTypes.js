import { useMutation, useQuery } from "react-query";
import {
	addUserTypes,
	deleteUserTypes,
	getUserTypes,
	UpdateUserTypes,
} from "~/api/usersTypes/usersTypes";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useUsersTypes = () =>
	useQuery([queryKeys.getUsersTypes], getUserTypes);

export const useAddUserTypes = (setOpen, open, refetch, clearInputs) =>
	useMutation(addUserTypes, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateUserTypes = (setOpen, open, refetch, clearInputs) =>
	useMutation(UpdateUserTypes, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteUserTypes = (setOpen, open, refetch) =>
	useMutation((code) => deleteUserTypes(code), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
