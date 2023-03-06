export const FilterFields = [
	{
		id: "filterGuest",
		name: "קופון אורח",
		apply(data) {
			return data?.filter((d) => d.isGuest);
		},
	},
	{
		id: "filterUsed",
		name: "מומש",
		apply(data) {
			return data?.filter((d) => d.isUsed);
		},
	},
];
