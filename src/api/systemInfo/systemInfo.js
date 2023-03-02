import axios from "../axios";

export const getSystemInfo = async () => {
	const { data } = await axios.get("/settings");

	return data.data;
};

export const updateSystemInfo = async (setting) => {
	const { data } = await axios.patch("/settings/updateKey", setting);

	return data;
};
