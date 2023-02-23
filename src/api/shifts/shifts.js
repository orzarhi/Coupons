import axios from "../axios";

export const getShifts = async () => {
	const { data } = await axios.get("/shifts");

	return data.data;
};

export const addShift = async (shift) => {
	const { data } = await axios.post("/shifts/addNew", shift);

	return data;
};

export const updateShift = async (shift) => {
	const { data } = await axios.patch("/shifts/update", shift);

	return data;
};

export const deleteShift = async (shiftCode) => {
	const { data } = await axios.delete(
		`/shifts/delete?shiftCode=${shiftCode}`
	);

	return data;
};
