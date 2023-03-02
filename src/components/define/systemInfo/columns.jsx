import { IconButton } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import { actionRow } from "~/components/define/_logic/actionRow";

export const columns = (setOpen, open, setInfo) => [
	{
		field: "actions",
		headerName: "עריכה",
		width: 140,
		headerAlign: "right",
		align: "right",
		sortable: false,
		disableColumnMenu: true,
		renderCell: (params) => {
			return (
				<>
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
		field: "value",
		headerName: "מייל",
		width: 200,
		headerAlign: "right",
		align: "right",
	},
	{
		field: "description",
		headerName: "תאור",
		width: 250,
		headerAlign: "right",
		align: "right",
	},
];
