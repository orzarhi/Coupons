import axios from "../axios";

export const getEmployees = async (token) => {
	const { data } = await axios.get("/employees", { headers: { token } });

	return data.data;
};

export const addEmployee = async (employee, token) => {
	const { data } = await axios.post("/employees/addNew", employee, {
		headers: { token },
	});

	return data;
};

export const updateEmployee = async (employee, token) => {
	const { data } = await axios.patch("/employees/update", employee, {
		headers: { token },
	});

	return data;
};

export const deleteEmployee = async (employeeCode, token) => {
	const { data } = await axios.delete(
		`/employees/delete?employeeCode=${employeeCode}`,
		{ headers: { token } }
	);

	return data;
};

export const assignAdminToAdministration = async (employee, token) => {
	const { data } = await axios.post(
		"/employees/assignAdminToAdministration",
		employee,
		{ headers: { token } }
	);

	return data;
};

export const unassignAdminFromAdministration = async (employeeCode, token) => {
	const { data } = await axios.delete(
		"/employees/unassignAdminFromAdministration",
		{
			data: employeeCode,
			headers: { token },
		}
	);

	return data;
};
