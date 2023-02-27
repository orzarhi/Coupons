import axios from "../axios";

export const getCoupons = async (token) => {
	const { data } = await axios.get("/coupons", {
		headers: { token },
	});

	return data.data;
};

export const addCoupon = async (coupons) => {
	const { data } = await axios.post("/coupons/addNew", coupons);

	return data;
};

export const updateCoupon = async (coupons) => {
	const { data } = await axios.patch("/coupons/update", coupons);

	return data;
};

export const deleteCoupon = async (couponCode) => {
	const { data } = await axios.delete(
		`/coupons/delete?couponCode=${couponCode}`
	);

	return data;
};

export const assignCouponToCompany = async (companyCode) => {
	const { data } = await axios.post(
		"/coupons/assignCouponToCompany",
		companyCode
	);

	return data;
};

export const unassignCouponToCompany = async (companyCode) => {
	const { data } = await axios.delete("/coupons/unassignCouponToCompany", {
		data: companyCode,
	});

	return data;
};

export const assignCouponToSupplier = async (supplierCode) => {
	const { data } = await axios.post(
		"/coupons/assignCouponToSupplier",
		supplierCode
	);

	return data;
};

export const unassignCouponToSupplier = async (supplierCode) => {
	const { data } = await axios.delete("/coupons/unassignCouponToSupplier", {
		data: supplierCode,
	});

	return data;
};
