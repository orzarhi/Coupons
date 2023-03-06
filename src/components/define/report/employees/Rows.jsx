import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { convertBoolean } from "~/utils/convertBoolean";

const Rows = ({ row }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{row.employeeCode}</TableCell>
				<TableCell align="right">{row.couponName}</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isGuest)}
				</TableCell>

				<TableCell align="right">
					{new Date(row.issuedDate).toLocaleDateString() +
						" " +
						row.issuedDate.slice(11, 16)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isUsed)}
				</TableCell>
				<TableCell align="right">
					{new Date(row.usedDate).getFullYear() > 2000 &&
						new Date(row.usedDate).toLocaleDateString() +
							" " +
							row.usedDate.slice(11, 16)}
				</TableCell>
				<TableCell align="right">
					{row.isUsed && row.supplierName}
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default Rows;
