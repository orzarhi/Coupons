import axios from "../axios";

export const getDepartments = async () => {
	const { data } = await axios.get("/departments");

	return data.data;
};

export const addDepartment = async (department) => {
	const { data } = await axios.post("/departments/addNew", department);

	return data;
};

export const updateDepartment = async (department) => {
	const { data } = await axios.patch("/departments/update", department);

	return data;
};

export const deleteDepartment = async (departmentCode) => {
	const { data } = await axios.delete(
		`/departments/delete?code=${departmentCode}`
	);

	return data;
};

export const assignDepartmentToCompany = async (companyCode) => {
	const { data } = await axios.post(
		"/departments/assignDepartmentToCompany",
		companyCode
	);

	return data;
};

export const unassignDepartmentToCompany = async (companyCode) => {
	const { data } = await axios.delete(
		"/departments/unassignDepartmentFromCompany",
		{ data: companyCode }
	);

	return data;
};
