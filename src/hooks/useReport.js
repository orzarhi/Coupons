import {
	getAdministrationReport,
	getBookkeepingReport,
	getCompanyReport,
	getEmployeeReport,
	getHilanMonthlyReport,
	getSupplierReport,
} from "~/api/reports/reports";
import { useDemandQuery } from "./useDemandQuery";

export const useHilanMonthlyReport = () =>
	useDemandQuery(getHilanMonthlyReport);
export const useBookkeepingReport = () => useDemandQuery(getBookkeepingReport);
export const useEmployeeReport = () => useDemandQuery(getEmployeeReport);
export const useSupplierReport = () => useDemandQuery(getSupplierReport);
export const useCompanyReport = () => useDemandQuery(getCompanyReport);

export const useAdministrationReport = () =>
	useDemandQuery(getAdministrationReport);
