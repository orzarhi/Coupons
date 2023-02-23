import axios from "../axios";

export const getCouponsTypes = async () => {
	const { data } = await axios.get("/coupons/getCouponTypes");

	return data.data;
};

export const addCouponType = async (couponType) => {
	const { data } = await axios.post("/coupons/addCouponType", couponType);

	return data;
};

export const updateCouponType = async (couponType) => {
	const { data } = await axios.patch("/coupons/updateCouponType", couponType);

	return data;
};

export const deleteCouponType = async (couponCodeType) => {
	const { data } = await axios.delete(
		`/coupons/deleteCouponType?couponTypeCode=${couponCodeType}`
	);

	return data;
};
