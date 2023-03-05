export const columns = [
	{
		field: "usedDate",
		headerName: "מימוש",
		width: 180,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return (
				new Date(params.row.usedDate).toLocaleDateString() +
				" | " +
				params.row.usedDate.slice(11, 16)
			);
		},
	},

	{
		field: "price",
		headerName: "מחיר",
		width: 160,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return "₪" + params.row.price;
		},
	},
	{
		field: "usedUsername",
		headerName: "שם משתמש",
		width: 160,
		headerAlign: "right",
		align: "right",
	},
];
