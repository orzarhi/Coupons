import axios from "../axios";

export const getTransactions = async (employeeCode) => {
	const { data } = await axios.get(
		`/transactions?employeeCode=${employeeCode}`
	);

	return data.data;
};

export const getEmployeeByUsername = async (username) => {
	const { data } = await axios.get(`/employees/${username}`);

	return data;
};

export const addCouponQr = async (couponQr) => {
	const { data } = await axios.post("/transactions/addNew", couponQr);

	return data;
};

export const addCouponQrForGuest = async (couponType) => {
	const { data } = await axios.post(
		"/transactions/addNewGuestTransaction",
		couponType
	);

	return data;
};

export const updateCouponQr = async (couponType) => {
	const { data } = await axios.patch("/transactions/update", couponType);

	return data;
};
