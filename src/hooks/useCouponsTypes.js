import { useMutation, useQuery } from "react-query";
import {
	addCouponType,
	deleteCouponType,
	getCouponsTypes,
	updateCouponType,
} from "~/api/couponsType/couponsType";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useCouponsTypes = () =>
	useQuery([queryKeys.couponsTypes], getCouponsTypes);

export const useAddCouponType = (setOpen, open, refetch, clearInputs) =>
	useMutation(addCouponType, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch, clearInputs);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateCouponType = (setOpen, open, refetch) =>
	useMutation(updateCouponType, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteCouponType = (setOpen, open, refetch) =>
	useMutation((couponCodeType) => deleteCouponType(couponCodeType), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
