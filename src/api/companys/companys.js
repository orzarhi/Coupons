import axios from "../axios";

export const getCompany = async () => {
	const { data } = await axios.get("/companies");

	return data.data;
};

export const addCompany = async (company) => {
	const { data } = await axios.post("/companies/addNew", company);

	return data;
};

export const updateCompany = async (company) => {
	const { data } = await axios.patch("/companies/update", company);

	return data;
};

export const deleteCompany = async (companyCode) => {
	const { data } = await axios.delete(
		`/companies/delete?companyCode=${companyCode}`
	);

	return data;
};

export const assignCompanyToAdministration = async (company) => {
	const { data } = await axios.post(
		"/companies/assignCompanyToAdministration",
		company
	);

	return data;
};

export const unassignCompanyFromAdministration = async (company) => {
	const { data } = await axios.delete(
		"/companies/unassignCompanyFromAdministration",
		company
	);

	return data;
};
