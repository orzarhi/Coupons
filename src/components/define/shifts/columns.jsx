import { IconButton } from "@mui/material";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { convertBoolean } from "~/utils/convertBoolean";
import { actionRow } from "../_logic/actionRow";

export const columns = (setOpen, open, setInfo) => [
	{
		field: "actions",
		headerName: "פעולות",
		width: 130,
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
		field: "isWithoutCharge",
		headerName: "ללא גביה מעובד מורשה",
		width: 200,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isWithoutCharge);
		},
	},
	{
		field: "isSaturday",
		headerName: "שבת",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isSaturday);
		},
	},
	{
		field: "isFriday",
		headerName: "שישי",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isFriday);
		},
	},
	{
		field: "isThursday",
		headerName: "חמישי",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isThursday);
		},
	},
	{
		field: "isWednesday",
		headerName: "רביעי",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isWednesday);
		},
	},
	{
		field: "isTuesday",
		headerName: "שלישי",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isTuesday);
		},
	},
	{
		field: "isMonday",
		headerName: "שני",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isMonday);
		},
	},
	{
		field: "isSunday",
		headerName: "ראשון",
		width: 100,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return convertBoolean(params.row.isSunday);
		},
	},
	{
		field: "endTime",
		headerName: "סיום",
		width: 110,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return params.row.endTime.slice(11, 16);
		},
	},
	{
		field: "startTime",
		headerName: "התחלה",
		width: 110,
		headerAlign: "right",
		align: "right",
		renderCell: (params) => {
			return params.row.startTime.slice(11, 16);
		},
	},
	{
		field: "description",
		headerName: "משמרת",
		width: 150,
		headerAlign: "right",
		align: "right",
	},
];
