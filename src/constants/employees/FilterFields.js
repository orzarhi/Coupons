export const FilterFields = [
	{
		id: "filterCanCreateGuestCoupon",
		name: "רשאי לקופון אורח",
		apply(data) {
			return data.filter((d) => d.canCreateGuestCoupon);
		},
	},
	{
		id: "filterActive",
		name: "פעיל",
		apply(data) {
			return data.filter((d) => d.isActive);
		},
	},

	{
		id: "filterCanUseInFreeShift",
		name: "זכאי למימוש ערב",
		apply(data) {
			return data.filter((d) => d.canUseInFreeShift);
		},
	},
	{
		id: "filterAdministration",
		name: "מנהל מנהלה",
		apply(data) {
			return data.filter((d) => d.isAdministrationAdmin);
		},
	},
];
