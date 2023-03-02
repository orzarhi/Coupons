import axios from "../axios";

export const getCoupons = async (token) => {
	const { data } = await axios.get("/coupons", {
		headers: { token },
	});

	return data.data;
};

export const addCoupon = async (coupons, token) => {
	const { data } = await axios.post("/coupons/addNew", coupons, {
		headers: { token },
	});

	return data;
};

export const updateCoupon = async (coupons, token) => {
	const { data } = await axios.patch("/coupons/update", coupons, {
		headers: { token },
	});

	return data;
};

export const deleteCoupon = async (couponCode, token) => {
	const { data } = await axios.delete(
		`/coupons/delete?couponCode=${couponCode}`,
		{ headers: { token } }
	);

	return data;
};

export const assignCouponToCompany = async (companyCode, token) => {
	const { data } = await axios.post(
		"/coupons/assignCouponToCompany",
		companyCode,
		{ headers: { token } }
	);

	return data;
};

export const unassignCouponToCompany = async (companyCode, token) => {
	const { data } = await axios.delete("/coupons/unassignCouponToCompany", {
		data: companyCode,
		headers: { token },
	});

	return data;
};

export const assignCouponToSupplier = async (supplierCode, token) => {
	const { data } = await axios.post(
		"/coupons/assignCouponToSupplier",
		supplierCode,
		{
			headers: { token },
		}
	);

	return data;
};

export const unassignCouponToSupplier = async (supplierCode, token) => {
	const { data } = await axios.delete("/coupons/unassignCouponToSupplier", {
		data: supplierCode,
		headers: { token },
	});

	return data;
};
