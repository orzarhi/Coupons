import axios from "../axios";

export const getBookkeepingReport = async (request) => {
	const { month, year, sendMail, token } = request;
	const { data } = await axios.get(
		`/reports/getBookkeepingReport?month=${month}&year=${year}&isSendMail=${sendMail}`,
		{ headers: { token } }
	);

	return data;
};

export const getSupplierReport = async (request) => {
	const { supplierCode, month, year, sendMail, token } = request;
	const { data } = await axios.get(
		`/reports/getSupplierReport?supplierCode=${supplierCode}&month=${month}&year=${year}&isSendMail=${sendMail}`,
		{ headers: { token } }
	);

	return data;
};

export const getHilanMonthlyReport = async (request) => {
	const { month, year, sendMail, token } = request;
	const { data } = await axios.get(
		`/reports/getHilanMonthlyReport?month=${month}&year=${year}&isSendMail=${sendMail}`,
		{ headers: { token } }
	);

	return data;
};

export const getCompanyReport = async (request) => {
	const { companyCode, fromDate, toDate, token } = request;
	const { data } = await axios.get(
		`/reports/getCompanyReport?companyCode=${companyCode}&fromDate=${fromDate}&toDate=${toDate}`,
		{ headers: { token } }
	);

	return data;
};

export const getAdministrationReport = async (request) => {
	const { administrationCode, fromDate, toDate, token } = request;
	const { data } = await axios.get(
		`/reports/getAdministrationReport?administrationCode=${administrationCode}&fromDate=${fromDate}&toDate=${toDate}`,
		{ headers: { token } }
	);

	return data;
};

export const getEmployeeReport = async (request) => {
	const { employeeCode, fromDate, toDate, token } = request;

	const { data } = await axios.get(
		`/reports/getEmployeeReport?employeeCode=${employeeCode}&fromDate=${fromDate}&toDate=${toDate}`,
		{ headers: { token } }
	);

	return data;
};
