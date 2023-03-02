import axios from "../axios";

export const getCouponsTypes = async (token) => {
	const { data } = await axios.get("/coupons/getCouponTypes", {
		headers: { token },
	});

	return data.data;
};

export const addCouponType = async (couponType, token) => {
	const { data } = await axios.post("/coupons/addCouponType", couponType, {
		headers: { token },
	});

	return data;
};

export const updateCouponType = async (couponType, token) => {
	const { data } = await axios.patch(
		"/coupons/updateCouponType",
		couponType,
		{ headers: { token } }
	);

	return data;
};

export const deleteCouponType = async (couponCodeType, token) => {
	const { data } = await axios.delete(
		`/coupons/deleteCouponType?couponTypeCode=${couponCodeType}`,
		{ headers: { token } }
	);

	return data;
};
