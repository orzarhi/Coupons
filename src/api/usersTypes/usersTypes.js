import axios from "../axios";

export const getUserTypes = async () => {
	const { data } = await axios.get("/users/getUserTypes");

	return data.data;
};

export const addUserTypes = async (userType) => {
	const { data } = await axios.post("/users/addUserType", userType);

	return data;
};
export const UpdateUserTypes = async (userType) => {
	const { data } = await axios.patch("/users/updateUserType", userType);

	return data;
};

export const deleteUserTypes = async (typeCode) => {
	const { data } = await axios.delete(
		`/users/deleteUserType?typeCode=${typeCode}`
	);

	return data;
};
