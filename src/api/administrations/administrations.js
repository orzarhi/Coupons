import axios from "../axios";

export const getAdministrations = async (token) => {
	const { data } = await axios.get("/administrations", {
		headers: { token },
	});

	return data.data;
};

export const addAdministration = async (administration, token) => {
	const { data } = await axios.post(
		"/administrations/addNew",
		administration,
		{
			headers: { token },
		}
	);

	return data;
};

export const updateAdministration = async (administration, token) => {
	const { data } = await axios.patch(
		"/administrations/update",
		administration,
		{
			headers: { token },
		}
	);

	return data;
};

export const deleteAdministration = async (code, token) => {
	const { data } = await axios.delete(
		`/administrations/delete?code=${code}`,
		{
			headers: { token },
		}
	);

	return data;
};
