import { Route, Routes } from "react-router-dom";
import * as Defines from "~/components/define/index";
import Suppliers from "./components/suppliers/Suppliers";
import Transactions from "./components/transactions/Transactions";
import Connection from "./pages/connection/connection";
import { useAuthStore } from "./store/auth";
import { PersonType } from "./constants/PersonType";

const Routers = () => {
	const { isLoggedIn, type, isSysAdmin } = useAuthStore();

	return (
		<>
			<Routes>
				<Route path="/" element={<Connection />} exact />
				{isLoggedIn && (
					<>
						{type === PersonType.EMPLOYEE.label && (
							<Route
								path="/employees"
								element={<Transactions />}
								exact
							/>
						)}

						{type === PersonType.SUPPLIER.label && (
							<Route
								path="/suppliers"
								element={<Suppliers />}
								exact
							/>
						)}
						{isSysAdmin && (
							<>
								<Route
									path="/registration-define"
									element={<Defines.Registration />}
									exact
								/>
								<Route
									path="/suppliers-define"
									element={<Defines.Suppliers />}
									exact
								/>
								<Route
									path="/administration-define"
									element={<Defines.Administration />}
									exact
								/>
								<Route
									path="/companies-define"
									element={<Defines.Companies />}
									exact
								/>
								<Route
									path="/employees-define"
									element={<Defines.Employees />}
									exact
								/>
								<Route
									path="/departments-define"
									element={<Defines.Departments />}
									exact
								/>
								<Route
									path="/user-types-define"
									element={<Defines.UserTypes />}
									exact
								/>
								<Route
									path="/coupons-define"
									element={<Defines.Coupons />}
									exact
								/>
								<Route
									path="/coupons-types-define"
									element={<Defines.CouponsTypes />}
									exact
								/>
								<Route
									path="/settings-define"
									element={<Defines.SystemInfo />}
									exact
								/>
								<Route
									path="/shifts-define"
									element={<Defines.Shifts />}
									exact
								/>
								<Route
									path="/report-suppliers-define"
									element={<Defines.ReportSuppliers />}
									exact
								/>
								<Route
									path="/report-employees-define"
									element={<Defines.ReportEmployees />}
									exact
								/>
								<Route
									path="/report-companys-define"
									element={<Defines.ReportCompanys />}
									exact
								/>
								<Route
									path="/report-bookkeeping-define"
									element={<Defines.ReportBookkeeping />}
									exact
								/>
								<Route
									path="/report-hilan-define"
									element={<Defines.ReportHilan />}
									exact
								/>
								<Route
									path="/report-administration-define"
									element={<Defines.ReportAdministration />}
									exact
								/>
							</>
						)}
					</>
				)}
			</Routes>
		</>
	);
};

export default Routers;
