import axios from "../axios";

export const getUsers = async () => {
	const { data } = await axios.get("/users");

	return data.data;
};

export const addUser = async (user) => {
	const { data } = await axios.post("/users/signup", user);

	return data;
};
export const updateUser = async (user) => {
	const { data } = await axios.patch("/users/update", user);

	return data;
};

export const deleteUser = async (username) => {
	const { data } = await axios.delete(`/users/delete?username=${username}`);

	return data;
};
