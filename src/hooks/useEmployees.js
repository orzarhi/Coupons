import { useMutation, useQuery } from "react-query";
import {
	addEmployee,
	assignAdminToAdministration,
	deleteEmployee,
	getEmployees,
	unassignAdminFromAdministration,
	updateEmployee,
} from "~/api/employees/employees";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";
import * as toastMessages from "~/utils/notification/index";

export const useEmployees = () => useQuery([queryKeys.employees], getEmployees);

export const useAddEmployee = (setOpen, open, refetch, clearInputs) =>
	useMutation(addEmployee, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateEmployee = (setOpen, open, refetch) =>
	useMutation(updateEmployee, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteEmployee = (setOpen, open, refetch) =>
	useMutation((employeeCode) => deleteEmployee(employeeCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: () => {
			toastMessages.errorMessage("לא ניתן למחוק, העובד משויך למנהלה.");
		},
	});

export const useAssignAdminToAdministration = (
	setOpen,
	open,
	refetch,
	clearInputs
) =>
	useMutation(assignAdminToAdministration, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUnassignAdminFromAdministration = (setOpen, open, refetch) =>
	useMutation(
		(employeeCode) => unassignAdminFromAdministration(employeeCode),
		{
			onSuccess: (data) => {
				success(data, setOpen, open, refetch);
			},
			onError: (data) => {
				error(data);
			},
		}
	);
