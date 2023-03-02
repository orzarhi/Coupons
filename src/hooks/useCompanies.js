import { useMutation, useQuery } from "react-query";
import {
	addCompany,
	assignCompanyToAdministration,
	deleteCompany,
	getCompany,
	unassignCompanyFromAdministration,
	updateCompany,
} from "~/api/companys/companys";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useCompanies = (token) =>
	useQuery([queryKeys.companies], () => getCompany(token), {
		enabled: !!token,
	});

export const useAddCompany = (setOpen, open, refetch, clearInputs) =>
	useMutation(addCompany, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateCompany = (setOpen, open, refetch) =>
	useMutation(updateCompany, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteCompany = (setOpen, open, refetch) =>
	useMutation((companyCode) => deleteCompany(companyCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useAssignCompanyToAdministration = (setOpen, open, refetch) =>
	useMutation(assignCompanyToAdministration, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUnassignCompanyFromAdministration = (setOpen, open, refetch) =>
	useMutation(unassignCompanyFromAdministration, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
