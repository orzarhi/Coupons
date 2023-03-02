import { useMutation, useQuery } from "react-query";
import {
	addDepartment,
	assignDepartmentToCompany,
	deleteDepartment,
	getDepartments,
	unassignDepartmentToCompany,
	updateDepartment,
} from "~/api/departments/departments";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useDepartments = (token) =>
	useQuery([queryKeys.departments], () => getDepartments(token), {
		enabled: !!token,
	});

export const useAddDepartment = (setOpen, open, refetch, clearInputs) =>
	useMutation(addDepartment, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateDepartment = (setOpen, open, refetch, clearInputs) =>
	useMutation(updateDepartment, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteDepartment = (setOpen, open, refetch) =>
	useMutation((departmentCode) => deleteDepartment(departmentCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useAssignDepartmentToCompany = (setOpen, open, refetch) =>
	useMutation(assignDepartmentToCompany, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUnassignDepartmentToCompanyt = (setOpen, open, refetch) =>
	useMutation((companyCode) => unassignDepartmentToCompany(companyCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
