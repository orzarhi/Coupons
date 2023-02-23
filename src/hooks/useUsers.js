import { useMutation, useQuery } from "react-query";
import { addUser, deleteUser, getUsers, updateUser } from "~/api/users/users";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useUsers = () => useQuery([queryKeys.users], getUsers);

export const useAddUser = (setOpen, open, refetch) =>
	useMutation(addUser, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateUser = (setOpen, open, refetch) =>
	useMutation(updateUser, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteUser = (setOpen, open, refetch) =>
	useMutation((username) => deleteUser(username), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
