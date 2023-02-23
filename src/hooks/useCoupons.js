import { useMutation, useQuery } from "react-query";
import {
	addCoupon,
	assignCouponToCompany,
	deleteCoupon,
	getCoupons,
	unassignCouponToCompany,
	updateCoupon,
} from "~/api/coupons/coupons";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useCoupons = (token) =>
	useQuery([queryKeys.coupons], () => getCoupons(token), {
		enabled: !!token,
	});

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
