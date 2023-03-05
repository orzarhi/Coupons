export const FilterFields = [
	{
		id: "filterActive",
		name: "פעיל",
		apply(data) {
			return data.filter((d) => d.isActive);
		},
	},
	{
		id: "filterMeals",
		name: "ספק ארוחות",
		apply(data) {
			return data.filter((d) => d.isMeals);
		},
	},
	{
		id: "filterVarious",
		name: "ספק שונות",
		apply(data) {
			return data.filter((d) => d.isVarious);
		},
	},
];
