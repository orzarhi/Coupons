import { convertBoolean } from "~/utils/convertBoolean";

export const columns = [
	{
		field: "supplierName",
		headerName: "עסק",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isUsed) && params.row.supplierName;
		},
	},
	{
		field: "usedDate",
		headerName: "תאריך מימוש",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return (
				new Date(params.row.usedDate).getFullYear() > 2000 &&
				new Date(params.row.usedDate).toLocaleDateString()
			);
		},
	},
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
	// {
	// 	field: "expirationDate",
	// 	headerName: "תאריך תפוגה",
	// 	width: 150,
	// 	headerAlign: "right",
	// 	align: "right",
	// 	renderCell: (params) => {
	// 		return new Date(params.row.expirationDate).toLocaleDateString();
	// 	},
	// },
	{
		field: "issuedDate",
		headerName: "תאריך הנפקה",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return new Date(params.row.issuedDate).toLocaleDateString();
		},
	},

	{
		field: "couponName",
		headerName: "קופון",
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
