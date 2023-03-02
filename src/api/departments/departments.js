import axios from "../axios";

export const getDepartments = async (token) => {
	const { data } = await axios.get("/departments", { headers: { token } });

	return data.data;
};

export const addDepartment = async (department, token) => {
	const { data } = await axios.post("/departments/addNew", department, {
		headers: { token },
	});

	return data;
};

export const updateDepartment = async (department, token) => {
	const { data } = await axios.patch("/departments/update", department, {
		headers: { token },
	});

	return data;
};

export const deleteDepartment = async (departmentCode, token) => {
	const { data } = await axios.delete(
		`/departments/delete?code=${departmentCode}`,
		{ headers: { token } }
	);

	return data;
};

export const assignDepartmentToCompany = async (companyCode, token) => {
	const { data } = await axios.post(
		"/departments/assignDepartmentToCompany",
		companyCode,
		{ headers: { token } }
	);

	return data;
};

export const unassignDepartmentToCompany = async (companyCode, token) => {
	const { data } = await axios.delete(
		"/departments/unassignDepartmentFromCompany",
		{ data: companyCode, headers: { token } }
	);

	return data;
};
