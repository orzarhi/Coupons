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

				<TableCell align="right">{row.code}</TableCell>
				<TableCell align="right">{row.name}</TableCell>
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
								חברות - {row?.companies?.length}
								<IconButton
									title="assign"
									className="!text-green-500 !text-2xl"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											row,
											"assignAdministrationToCompanies"
										)
									}
								>
									<RiAddFill />
								</IconButton>
							</Typography>

							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
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
										<TableRow key={orderRow.companyCode}>
											<TableCell align="right">
												{orderRow.companyName}
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
								מנהלים - {row?.admins?.length}
								<IconButton
									title="assign"
									className="!text-green-500 !text-2xl"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											row,
											"assignAdministrationToAdmin"
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
											תעודת זהות
										</TableCell>
										<TableCell align="right">
											מספר פלאפון
										</TableCell>
										<TableCell align="right">
											חברה
										</TableCell>
										<TableCell align="right">
											מחלקה
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
									{row?.admins?.map((orderRow) => (
										<TableRow key={orderRow.employeeCode}>
											<TableCell align="right">
												{orderRow.employeeCode}
											</TableCell>
											<TableCell align="right">
												{orderRow.employeeName}
											</TableCell>
											<TableCell align="right">
												{orderRow.username}
											</TableCell>
											<TableCell align="right">
												{orderRow.employeeId}
											</TableCell>
											<TableCell align="right">
												{orderRow.phoneNumber}
											</TableCell>
											<TableCell align="right">
												{orderRow.companyName}
											</TableCell>
											<TableCell align="right">
												{orderRow.departmentName}
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
															"delete-unassignToEmployee",
															orderRow.employeeCode
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
