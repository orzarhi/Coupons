import { useMutation, useQuery } from "react-query";
import {
	addCoupon,
	assignCouponToCompany,
	assignCouponToSupplier,
	deleteCoupon,
	getCoupons,
	unassignCouponToCompany,
	unassignCouponToSupplier,
	updateCoupon,
} from "~/api/coupons/coupons";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useCoupons = () => useQuery([queryKeys.coupons], getCoupons);

export const useAddCoupon = (setOpen, open, refetch, clearInputs) =>
	useMutation(addCoupon, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateCoupon = (setOpen, open, refetch) =>
	useMutation(updateCoupon, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteCoupon = (setOpen, open, refetch) =>
	useMutation((couponCode) => deleteCoupon(couponCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useAssignCouponToCompany = (setOpen, open, refetch) =>
	useMutation(assignCouponToCompany, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUnassignCouponToCompany = (setOpen, open, refetch) =>
	useMutation((companyCode) => unassignCouponToCompany(companyCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useAssignCouponToSupplier = (setOpen, open, refetch) =>
	useMutation(assignCouponToSupplier, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUnassignCouponToSupplier = (setOpen, open, refetch) =>
	useMutation((supplierCode) => unassignCouponToSupplier(supplierCode), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
