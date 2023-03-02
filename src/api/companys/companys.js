import axios from "../axios";

export const getCompany = async (token) => {
	const { data } = await axios.get("/companies", {
		headers: { token },
	});

	return data.data;
};

export const addCompany = async (company, token) => {
	const { data } = await axios.post("/companies/addNew", company, {
		headers: { token },
	});

	return data;
};

export const updateCompany = async (company, token) => {
	const { data } = await axios.patch("/companies/update", company, {
		headers: { token },
	});

	return data;
};

export const deleteCompany = async (companyCode, token) => {
	const { data } = await axios.delete(
		`/companies/delete?companyCode=${companyCode}`,
		{
			headers: { token },
		}
	);

	return data;
};

export const assignCompanyToAdministration = async (company, token) => {
	const { data } = await axios.post(
		"/companies/assignCompanyToAdministration",
		company,
		{
			headers: { token },
		}
	);

	return data;
};

export const unassignCompanyFromAdministration = async (company, token) => {
	const { data } = await axios.delete(
		"/companies/unassignCompanyFromAdministration",
		company,
		{
			headers: { token },
		}
	);

	return data;
};
