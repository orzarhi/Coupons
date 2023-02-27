import { convertBoolean } from "~/utils/convertBoolean";

export const columns = [
	// {
	// 	field: "usedDate",
	// 	headerName: "תאריך מימוש",
	// 	width: 150,
	// 	headerAlign: "right",
	// 	align: "right",
	// 	renderCell: (params) => {
	// 		return new Date(params.row.isUsed).toLocaleDateString();
	// 	},
	// },
	{
		field: "isUsed",
		headerName: "מומש",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isUsed);
		},
	},
	{
		field: "administrationName",
		headerName: "מנהלה",
		width: 150,
		headerAlign: "right",
		align: "right",
	},

	{
		field: "supplierName",
		headerName: "עסק",
		width: 150,
		headerAlign: "right",
		align: "right",
	},

	{
		field: "companyName",
		headerName: "חברה",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "employeeName",
		headerName: "שם",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "employeeCode",
		headerName: "קוד עובד",
		width: 130,
		headerAlign: "right",
		align: "right",
	},
];
