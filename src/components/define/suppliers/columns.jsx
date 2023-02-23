import { actionRow } from "../_logic/actionRow";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { IconButton } from "@mui/material";
import { convertBoolean } from "~/utils/convertBoolean";

export const columns = (setOpen, open, setInfo) => [
	{
		field: "actions",
		headerName: "פעולות",
		width: 140,
		headerAlign: "right",
		align: "right",
		sortable: false,
		disableColumnMenu: true,
		renderCell: (params) => {
			return (
				<>
					<IconButton
						title="Remove"
						onClick={() =>
							actionRow(
								setOpen,
								open,
								setInfo,
								params.row,
								"delete"
							)
						}
					>
						<MdDeleteForever />
					</IconButton>
					<IconButton
						title="Edit"
						onClick={() =>
							actionRow(
								setOpen,
								open,
								setInfo,
								params.row,
								"edit"
							)
						}
					>
						<MdOutlineModeEdit />
					</IconButton>
				</>
			);
		},
	},
	// {
	// 	field: "isAdministrationAdmin",
	// 	headerName: "מנהל מינהל",
	// 	width: 140,
	// 	headerAlign: "right",
	// 	align: "right",
	// 	renderCell: (params) => {
	// 		return convertBoolean(params.row.isAdministrationAdmin);
	// 	},
	// },

	// {
	// 	field: "canUseInFreeShift",
	// 	headerName: "זכאי למימוש ללא חיוב",
	// 	width: 140,
	// 	headerAlign: "right",
	// 	align: "right",
	// 	renderCell: (params) => {
	// 		return convertBoolean(params.row.canUseInFreeShift);
	// 	},
	// },

	{
		field: "isVarious",
		headerName: "ספק שונות",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isVarious);
		},
	},
	{
		field: "isMeals",
		headerName: "ספק ארוחות",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isMeals);
		},
	},
	{
		field: "isActive",
		headerName: "פעיל",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isActive);
		},
	},
	{
		field: "businessNumber",
		headerName: "מספר עסק",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "phoneNumber",
		headerName: "מספר פלאפון",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "email",
		headerName: "מייל",
		width: 190,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "username",
		headerName: "שם משתמש",
		width: 140,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "supplierName",
		headerName: "שם עסק",
		width: 140,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "supplierCode",
		headerName: "קוד ספק",
		width: 100,
		headerAlign: "right",
		align: "right",
	},
];
