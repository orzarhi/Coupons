import { useQuery } from "react-query";
import {
	getAdministrationReport,
	getBookkeepingReport,
	getCompanyReport,
	getEmployeeReport,
	getHilanMonthlyReport,
	getSupplierReport,
} from "~/api/reports/reports";
import { queryKeys } from "~/constants/queryKeys";
import { useDemandQuery } from "./useDemandQuery";

export const useBookkeepingReport = (month, year, sendMail) =>
	useQuery([queryKeys.bookkeepingReport], () =>
		getBookkeepingReport(month, year, sendMail)
	);

export const useHilanMonthlyReport = (month, year, sendMail) =>
	useQuery([queryKeys.supplierReport], () =>
		getHilanMonthlyReport(month, year, sendMail)
	);

export const useAdministrationReport = (administrationCode, fromDate, toDate) =>
	useQuery([queryKeys.administrationReport], () =>
		getAdministrationReport(administrationCode, fromDate, toDate)
	);

export const useEmployeeReport = () => useDemandQuery(getEmployeeReport);
export const useSupplierReport = () => useDemandQuery(getSupplierReport);
export const useCompanyReport = () => useDemandQuery(getCompanyReport);
