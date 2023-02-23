export const columns = [
	{
		field: "supplierName",
		headerName: "עסק",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return params.row.supplierName;
		},
	},
	{
		field: "usedDate",
		headerName: "תאריך מימוש",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return new Date(params.row.usedDate).toLocaleDateString();
		},
	},

	{
		field: "employeeCode",
		headerName: "קוד עובד",
		width: 150,
		headerAlign: "right",
		align: "right",
	},

	{
		field: "employeeName",
		headerName: "עובד",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "companyName",
		headerName: "חברה",
		width: 130,
		headerAlign: "right",
		align: "right",
	},
];
