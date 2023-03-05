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
import { actionRow } from "~/components/define/_logic/actionRow";

const Rows = ({ row, setOpen, open, setInfo }) => {
	const [openTable, setOpenTable] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
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
				</TableCell>
				<TableCell align="right">{row.couponCode}</TableCell>
				<TableCell align="right">{row.couponName}</TableCell>
				<TableCell align="right">{row.couponDesc}</TableCell>
				<TableCell align="right">{row.couponTypeName}</TableCell>
				<TableCell align="right">₪{row.debitAmount}</TableCell>
				<TableCell align="right">{row.experationHours}</TableCell>
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
								מחלקות - {row?.companies?.length}
								<IconButton
									title="שיוך מחלקה"
									className="!text-green-700 !text-2xl"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											row,
											"assignCompanieToCoupon"
										)
									}
								>
									<RiAddFill />
								</IconButton>
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="right">קוד</TableCell>
										<TableCell align="right">שם</TableCell>
										<TableCell align="right">
											מייל
										</TableCell>
										<TableCell align="right">
											מספר טלפון
										</TableCell>
										<TableCell align="right">
											לוגו
										</TableCell>
										<TableCell align="right">
											פעיל
										</TableCell>
										<TableCell align="right">
											הסר שיוך
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.companies?.map((orderRow) => (
										<TableRow key={orderRow.departmentCode}>
											<TableCell align="right">
												{orderRow.departmentCode}
											</TableCell>
											<TableCell align="right">
												{`${orderRow.companyName} - ${orderRow.departmentName}`}
											</TableCell>
											<TableCell align="right">
												{orderRow.email}
											</TableCell>
											<TableCell align="right">
												{orderRow.phoneNumber}
											</TableCell>
											<TableCell align="right">
												{orderRow.logoFile}
											</TableCell>
											<TableCell align="right">
												{convertBoolean(
													orderRow.isActive
												)}
											</TableCell>

											<TableCell align="right">
												<IconButton
													title="Remove"
													onClick={() =>
														actionRow(
															setOpen,
															open,
															setInfo,
															row,
															"delete-unassign",
															orderRow.companyCode
														)
													}
												>
													<MdRemoveCircleOutline />
												</IconButton>
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
								ספקים - {row?.suppliers?.length}
								<IconButton
									title="שיוך ספקים"
									className="!text-green-700 !text-2xl"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											row,
											"assignSuppliersToCoupon"
										)
									}
								>
									<RiAddFill />
								</IconButton>
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="right">קוד</TableCell>
										<TableCell align="right">שם</TableCell>
										<TableCell align="right">
											שם משתמש
										</TableCell>
										<TableCell align="right">
											מייל
										</TableCell>
										<TableCell align="right">
											מספר פלאפון
										</TableCell>
										<TableCell align="right">ח.פ</TableCell>
										<TableCell align="right">
											פעיל
										</TableCell>
										<TableCell align="right">
											ספק ארוחות
										</TableCell>

										<TableCell align="right">
											ספק שונות
										</TableCell>
										<TableCell align="right">
											הסר שיווך
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.suppliers?.map((orderRow) => (
										<TableRow key={orderRow.supplierCode}>
											<TableCell align="right">
												{orderRow.supplierCode}
											</TableCell>
											<TableCell align="right">
												{orderRow.supplierName}
											</TableCell>
											<TableCell align="right">
												{orderRow.username}
											</TableCell>
											<TableCell align="right">
												{orderRow.email}
											</TableCell>
											<TableCell align="right">
												{orderRow.phoneNumber}
											</TableCell>
											<TableCell align="right">
												{orderRow.businessNumber}
											</TableCell>
											<TableCell align="right">
												{convertBoolean(
													orderRow.isActive
												)}
											</TableCell>
											<TableCell align="right">
												{convertBoolean(
													orderRow.isMeals
												)}
											</TableCell>
											<TableCell align="right">
												{convertBoolean(
													orderRow.isVarious
												)}
											</TableCell>
											<TableCell align="right">
												<IconButton
													title="Remove"
													onClick={() =>
														actionRow(
															setOpen,
															open,
															setInfo,
															row,
															"delete-unassignToSupplier",
															orderRow.supplierCode
														)
													}
												>
													<MdRemoveCircleOutline />
												</IconButton>
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
