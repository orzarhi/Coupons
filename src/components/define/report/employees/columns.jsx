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
				new Date(params.row.usedDate).toLocaleDateString() +
					" | " +
					params.row.usedDate.slice(11, 16)
			);
		},
	},
	{
		field: "isUsed",
		headerName: "מומש",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isUsed);
		},
	},
	{
		field: "issuedDate",
		headerName: "הנפקה",
		width: 180,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return (
				new Date(params.row.issuedDate).toLocaleDateString() +
				" | " +
				params.row.issuedDate.slice(11, 16)
			);
		},
	},
	{
		field: "isGuest",
		headerName: "קופון אורח",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isGuest);
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
