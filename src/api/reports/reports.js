import axios from "../axios";

export const getBookkeepingReport = async (month, year, sendMail) => {
	const { data } = await axios.get(
		`/reports/getBookkeepingReport?month=${month}&year=${year}&isSendMail=${sendMail}`
	);

	return data;
};

export const getSupplierReport = async (request) => {
	const { supplierCode, month, year, sendMail } = request;
	const { data } = await axios.get(
		`/reports/getSupplierReport?supplierCode=${supplierCode}&month=${month}&year=${year}&isSendMail=${sendMail}`
	);

	return data;
};

export const getHilanMonthlyReport = async (month, year, sendMail) => {
	const { data } = await axios.get(
		`/reports/getHilanMonthlyReport?month=${month}&year=${year}&isSendMail=${sendMail}`
	);

	return data;
};

export const getCompanyReport = async (request) => {
	const { companyCode, fromDate, toDate } = request;
	const { data } = await axios.get(
		`/reports/getCompanyReport?companyCode=${companyCode}&fromDate=${fromDate}&toDate=${toDate}`
	);

	return data;
};

export const getAdministrationReport = async (
	administrationCode,
	fromDate,
	toDate
) => {
	const { data } = await axios.get(
		`/reports/getAdministrationReport?administrationCode=${administrationCode}&fromDate=${fromDate}&toDate=${toDate}`
	);

	return data;
};

export const getEmployeeReport = async (request) => {
	const { employeeCode, fromDate, toDate } = request;

	const { data } = await axios.get(
		`/reports/getEmployeeReport?employeeCode=${employeeCode}&fromDate=${fromDate}&toDate=${toDate}`
	);

	return data;
};
