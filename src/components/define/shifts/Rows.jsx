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
				<TableCell align="right">{row.description}</TableCell>
				<TableCell align="right">
					{row.startTime.slice(11, 16)}
				</TableCell>

				<TableCell align="right">{row.endTime.slice(11, 16)}</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isSunday)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isMonday)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isTuesday)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isWednesday)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isThursday)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isFriday)}
				</TableCell>

				<TableCell align="right">{row.isSaturday}</TableCell>

				<TableCell align="right">
					{convertBoolean(row.isWithoutCharge)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isActive)}
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
