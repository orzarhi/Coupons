import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { convertBoolean } from "~/utils/convertBoolean";

const Rows = ({ row }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{row.employeeCode}</TableCell>
				<TableCell align="right">{row.employeeName}</TableCell>
				<TableCell align="right">{row.companyName}</TableCell>
				<TableCell align="right">{row.supplierName}</TableCell>
				<TableCell align="right">{row.administrationName}</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isUsed)}
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default Rows;
