import axios from "../axios";

export const getSuppliers = async () => {
	const { data } = await axios.get("/suppliers");

	return data.data;
};

export const getSupplierByUserName = async (username) => {
	const { data } = await axios.get(`/suppliers/${username}`);

	return data.data;
};

export const addSupplier = async (supplier) => {
	const { data } = await axios.post("/suppliers/addNew", supplier);

	return data;
};

export const updateSupplier = async (supplier) => {
	const { data } = await axios.patch("/suppliers/update", supplier);

	return data;
};

export const deleteSupplier = async (supplierCode) => {
	const { data } = await axios.delete(
		`/suppliers/delete?supplierCode=${supplierCode}`
	);

	return data;
};
