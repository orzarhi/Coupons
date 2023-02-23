import axios from "../axios";

export const getAdministrations = async () => {
	const { data } = await axios.get("/administrations");

	return data.data;
};

export const addAdministration = async (administration) => {
	const { data } = await axios.post(
		"/administrations/addNew",
		administration
	);

	return data;
};

export const updateAdministration = async (administration) => {
	const { data } = await axios.patch(
		"/administrations/update",
		administration
	);

	return data;
};

export const deleteAdministration = async (code) => {
	const { data } = await axios.delete(`/administrations/delete?code=${code}`);

	return data;
};
