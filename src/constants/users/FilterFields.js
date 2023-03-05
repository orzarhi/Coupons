import { PersonType } from "../PersonType";

export const FilterFields = [
	{
		id: "filterActive",
		name: "פעיל",
		apply(data) {
			return data.filter((d) => d.isActive);
		},
	},
	{
		id: "filterAdmin",
		name: "מנהל מערכת",
		apply(data) {
			return data.filter((d) => d.isSysAdmin);
		},
	},
	{
		id: "filterEmployee",
		name: "עובד",
		apply(data) {
			return data.filter(
				(d) => d.typeDescription === PersonType.EMPLOYEE.label
			);
		},
	},
	{
		id: "filterSupplier",
		name: "עסק",
		apply(data) {
			return data.filter(
				(d) => d.typeDescription === PersonType.SUPPLIER.label
			);
		},
	},
];
