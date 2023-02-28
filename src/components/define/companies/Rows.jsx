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
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { convertBoolean } from "~/utils/convertBoolean";
import { actionRow } from "../_logic/actionRow";

const Rows = ({ row, setOpen, open, setInfo }) => {
	const [openTable, setOpenTable] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					{row.administrations.length > 0 && (
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

				<TableCell align="right">{row.companyCode}</TableCell>
				<TableCell align="right">{row.companyName}</TableCell>
				<TableCell align="right">{row.email}</TableCell>
				<TableCell align="right">{row.phoneNumber}</TableCell>
				<TableCell align="right">{row.logoFile}</TableCell>
				<TableCell align="right">
					<IconButton
						title="assign"
						onClick={() =>
							actionRow(setOpen, open, setInfo, row, "assign")
						}
					>
						<RiAddFill />
					</IconButton>
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
								בנהלת - {row?.administrations?.length}
							</Typography>

							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="right">קוד</TableCell>
										<TableCell align="right">שם</TableCell>
										<TableCell align="right">
											פעיל
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.administrations?.map((orderRow) => (
										<TableRow key={orderRow.code}>
											<TableCell align="right">
												{orderRow.code}
											</TableCell>
											<TableCell align="right">
												{orderRow.name}
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
								מחלקות משויכות - {row?.departments?.length}
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="right">קוד</TableCell>
										<TableCell align="right">שם</TableCell>
										<TableCell align="right">
											פעיל
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.departments?.map((orderRow) => (
										<TableRow key={orderRow.code}>
											<TableCell align="right">
												{orderRow.code}
											</TableCell>
											<TableCell align="right">
												{orderRow.name}
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
										<TableCell align="right">שם</TableCell>
										<TableCell align="right">
											תיאור
										</TableCell>

										<TableCell align="right">
											מחיר
										</TableCell>
										<TableCell align="right">
											תוקף - שעות
										</TableCell>
										<TableCell align="right">סוג</TableCell>
										<TableCell align="right">
											פעיל
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.coupons?.map((orderRow) => (
										<TableRow key={orderRow.couponCode}>
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
												{orderRow.experationHours}
											</TableCell>
											<TableCell align="right">
												{orderRow.couponTypeName}
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
