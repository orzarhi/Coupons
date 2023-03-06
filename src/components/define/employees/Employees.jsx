import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useReducer } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Spinner from "~/components/ui/spinner/Spinner";
import { FilterFields } from "~/constants/employees/FilterFields";
import { useEmployees } from "~/hooks/useEmployees";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

const initialFiltersReducer = FilterFields.reduce(
	(acc, curr) => ({ ...acc, [curr.id]: false }),
	{}
);

const filterReducer = (state, action) => {
	return { ...state, [action.id]: !state[action.id] };
};

const Employees = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [showFilters, setShowFilters] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		code: "",
	});

	const [filters, dispatch] = useReducer(
		filterReducer,
		initialFiltersReducer
	);

	const { data: dataEmployees, refetch, isLoading } = useEmployees();

	const data = useMemo(() => {
		let results = dataEmployees?.filter((user) =>
			user.employeeName.toLowerCase().includes(inputSearch.toLowerCase())
		);
		results = FilterFields.filter((f) => filters[f.id]).reduce(
			(acc, curr) => curr.apply(acc),
			results
		);

		return results;
	}, [dataEmployees, inputSearch, filters]);

	const Filters = useMemo(
		() =>
			FilterFields.map((f) => (
				<FormControlLabel
					key={f.id}
					control={
						<Checkbox defaultValue={false} value={filters[f.id]} />
					}
					label={f.name}
					onChange={() => {
						dispatch(f);
					}}
				/>
			)),
		[filters]
	);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת עובדים"
				textBtn="הוספת עובד חדש"
				setOpen={setOpen}
				open={open}
				setInputSearch={setInputSearch}
				label="עובד"
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>
			<div className="flex justify-center">
				<IconButton onClick={() => setShowFilters(!showFilters)}>
					<FaFilter />
				</IconButton>
			</div>
			{showFilters && (
				<div className="flex justify-center mt-4">{Filters}</div>
			)}
			<div className="relative bottom-4 w-full block m-auto p-5 xl:w-full xl:relative xl:bottom-4 lg:w-11/12">
				{data && (
					<TableContainer component={Paper} sx={{ height: 600 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell />
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
									<TableCell align="right">חברה</TableCell>
									<TableCell align="right">מחלקה</TableCell>

									<TableCell align="right">
										מספר ארוחות ביום
									</TableCell>
									<TableCell align="right">
										{
											FilterFields.find(
												(f) =>
													f.id ===
													"filterCanCreateGuestCoupon"
											)?.name
										}
									</TableCell>
									<TableCell align="right">
										{
											FilterFields.find(
												(f) => f.id === "filterActive"
											)?.name
										}
									</TableCell>
									<TableCell align="right">
										{
											FilterFields.find(
												(f) =>
													f.id ===
													"filterCanUseInFreeShift"
											)?.name
										}
									</TableCell>
									<TableCell align="right">
										{
											FilterFields.find(
												(f) =>
													f.id ===
													"filterAdministration"
											)?.name
										}
									</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map((row) => (
									<Rows
										key={row.employeeCode}
										row={row}
										setOpen={setOpen}
										open={open}
										setInfo={setInfo}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
			{open.action && (
				<Actions
					open={open}
					setOpen={setOpen}
					info={info}
					refetch={refetch}
				/>
			)}
		</>
	);
};

export default Employees;
