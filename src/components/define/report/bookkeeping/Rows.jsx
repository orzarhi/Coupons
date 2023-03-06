import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";

const Rows = ({ row }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{row.employeeCode}</TableCell>
				<TableCell align="right">{row.employeeName}</TableCell>
				<TableCell align="right">{row.companyName}</TableCell>
				<TableCell align="right">{row.departmentName}</TableCell>
				<TableCell align="right">{row.totalMeals}</TableCell>
				<TableCell align="right">{row.totalMealsNoCharge}</TableCell>
				<TableCell align="right">
					{row.totalComanyMealsCharge}
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default Rows;
