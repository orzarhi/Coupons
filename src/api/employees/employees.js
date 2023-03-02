import axios from "../axios";

export const getEmployees = async () => {
	const { data } = await axios.get("/employees");

	return data.data;
};

export const addEmployee = async (employee) => {
	const { data } = await axios.post("/employees/addNew", employee);

	return data;
};

export const updateEmployee = async (employee) => {
	const { data } = await axios.patch("/employees/update", employee);

	return data;
};

export const deleteEmployee = async (employeeCode) => {
	const { data } = await axios.delete(
		`/employees/delete?employeeCode=${employeeCode}`
	);

	return data;
};

export const assignAdminToAdministration = async (employee) => {
	const { data } = await axios.post(
		"/employees/assignAdminToAdministration",
		employee
	);

	return data;
};

export const unassignAdminFromAdministration = async (employeeCode) => {
	const { data } = await axios.delete(
		"/employees/unassignAdminFromAdministration",
		{
			data: employeeCode,
		}
	);

	return data;
};
