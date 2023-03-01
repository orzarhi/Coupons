import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import {
	MdDeleteForever,
	MdOutlineModeEdit,
	MdRemoveCircleOutline,
} from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { convertBoolean } from "~/utils/convertBoolean";
import { actionRow } from "../_logic/actionRow";

const Rows = ({ row, setOpen, open, setInfo }) => {
	const [openTable, setOpenTable] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					{row?.coupons.length > 0 && (
						<IconButton
							aria-label="expand row"
							size="small"
							onClick={() => setOpenTable(!openTable)}
						>
							{openTable ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
						</IconButton>
					)}
				</TableCell>

				<TableCell align="right">{row.supplierCode}</TableCell>
				<TableCell align="right">{row.supplierName}</TableCell>
				<TableCell align="right">{row.username}</TableCell>
				<TableCell align="right">{row.email}</TableCell>
				<TableCell align="right">{row.phoneNumber}</TableCell>
				<TableCell align="right">{row.businessNumber}</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isActive)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isMeals)}
				</TableCell>
				<TableCell align="right">
					{convertBoolean(row.isVarious)}
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
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={openTable} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								קופונים משויכים - {row?.coupons?.length}
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="right">קוד</TableCell>
										<TableCell align="right">שם</TableCell>
										<TableCell align="right">
											תיאור
										</TableCell>

										<TableCell align="right">
											סכום חיוב
										</TableCell>
										<TableCell align="right">
											סוג קופון
										</TableCell>
										<TableCell align="right">
											תוקף - שעות
										</TableCell>
										<TableCell align="right">
											פעיל
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.coupons?.map((orderRow) => (
										<TableRow key={orderRow.couponCode}>
											<TableCell align="right">
												{orderRow.couponCode}
											</TableCell>
											<TableCell align="right">
												{orderRow.couponName}
											</TableCell>

											<TableCell align="right">
												{orderRow.couponDesc}
											</TableCell>

											<TableCell align="right">
												₪{orderRow.debitAmount}
											</TableCell>

											<TableCell align="right">
												{orderRow.couponTypeName}
											</TableCell>
											<TableCell align="right">
												{orderRow.experationHours}
											</TableCell>

											<TableCell align="right">
												{convertBoolean(
													orderRow.isActive
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export default Rows;
