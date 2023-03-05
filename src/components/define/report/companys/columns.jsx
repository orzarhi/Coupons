export const columns = [
	{
		field: "debitAmount",
		headerName: "מחיר עובד",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return "₪" + params.row.debitAmount;
		},
	},
	{
		field: "supplierPrice",
		headerName: "מחיר ספק",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return "₪" + params.row.supplierPrice;
		},
	},
	{
		field: "supplierName",
		headerName: "עסק",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "usedDate",
		headerName: "מימוש",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return (
				new Date(params.row.usedDate).toLocaleDateString() +
				" " +
				params.row.usedDate.slice(11, 16)
			);
		},
	},

	{
		field: "employeeName",
		headerName: "שם עובד",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "employeeCode",
		headerName: "קוד עובד",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	// {
	// 	field: "companyName",
	// 	headerName: "חברה",
	// 	width: 130,
	// 	headerAlign: "right",
	// 	align: "right",
	// },
];
