import axios from "../axios";

export const getSystemInfo = async (token) => {
	const { data } = await axios.get("/settings", {
		headers: { token },
	});

	return data.data;
};

export const updateSystemInfo = async (setting) => {
	const { data } = await axios.patch("/settings/updateKey", setting);

	return data;
};
