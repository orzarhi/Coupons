import { IconButton } from "@mui/material";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { convertBoolean } from "~/utils/convertBoolean";
import { actionRow } from "~/components/define/_logic/actionRow";

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
		field: "isMeal",
		headerName: "ארוחה",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isMeal);
		},
	},
	{
		field: "couponTypeName",
		headerName: "תאור",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "couponTypeCode",
		headerName: "סוג",
		width: 130,
		headerAlign: "right",
		align: "right",
	},
];
