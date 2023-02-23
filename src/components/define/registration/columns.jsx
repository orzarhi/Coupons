import { IconButton } from "@mui/material";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { convertBoolean } from "~/utils/convertBoolean";
import { actionRow } from "../_logic/actionRow";

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
	{
		field: "isSysAdmin",
		headerName: "הרשאת מנהל מערכת",
		width: 150,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isSysAdmin);
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
		field: "type",
		headerName: "סוג",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return params.row.typeDescription;
		},
	},
	{
		field: "username",
		headerName: "שם משתמש",
		width: 180,
		headerAlign: "right",
		align: "right",
	},
];
