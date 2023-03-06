import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { convertBoolean } from "~/utils/convertBoolean";
import { actionRow } from "../_logic/actionRow";

const Rows = ({ row, setOpen, open, setInfo }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{row.couponTypeName}</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isMeal)}
				</TableCell>

				<TableCell align="right">
					<IconButton
						title="Remove"
						onClick={() =>
							actionRow(setOpen, open, setInfo, row, "delete")
						}
					>
						<MdDeleteForever />
					</IconButton>
					<IconButton
						title="Edit"
						onClick={() =>
							actionRow(setOpen, open, setInfo, row, "edit")
						}
					>
						<MdOutlineModeEdit />
					</IconButton>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default Rows;
