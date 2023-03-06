import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";

const Rows = ({ row }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{row.employeeCode}</TableCell>
				<TableCell align="right">{row.employeeName}</TableCell>

				<TableCell align="right">
					{new Date(row.usedDate).toLocaleDateString() +
						" " +
						row.usedDate.slice(11, 16)}
				</TableCell>

				<TableCell align="right">{row.supplierName}</TableCell>
				<TableCell align="right">₪{row.supplierPrice}</TableCell>
				<TableCell align="right">₪{row.debitAmount}</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default Rows;
