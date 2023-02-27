export const columns = [
	{
		field: "totalPrice",
		headerName: "סך הכל מחיר",
		width: 160,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return "₪" + params.row.totalPrice;
		},
	},

	{
		field: "totalMeals",
		headerName: "סך הכל ארוחות",
		width: 160,
		headerAlign: "right",
		align: "right",
	},

	{
		field: "employeeName",
		headerName: "שם",
		width: 160,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "employeeCode",
		headerName: "קוד עובד",
		width: 160,
		headerAlign: "right",
		align: "right",
	},
];
