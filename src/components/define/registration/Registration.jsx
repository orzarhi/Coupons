import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMemo, useReducer, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Spinner from "~/components/ui/spinner/Spinner";
import { FilterFields } from "~/constants/users/FilterFields";
import { useUsers } from "~/hooks/useUsers";
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

const Registration = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [showFilters, setShowFilters] = useState(false);

	const [filters, dispatch] = useReducer(
		filterReducer,
		initialFiltersReducer
	);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});
	const { data: dataUsers, refetch, isLoading } = useUsers();

	const data = useMemo(() => {
		let results = dataUsers?.filter((user) =>
			user.username.toLowerCase().includes(inputSearch.toLowerCase())
		);
		results = FilterFields.filter((f) => filters[f.id]).reduce(
			(acc, curr) => curr.apply(acc),
			results
		);

		return results;
	}, [dataUsers, inputSearch, filters]);

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
				title="משתמשים"
				setOpen={setOpen}
				open={open}
				setInputSearch={setInputSearch}
				label="משתמש"
				showBtn={false}
			/>

			<div className="flex justify-center">
				<IconButton onClick={() => setShowFilters(!showFilters)}>
					<FaFilter />
				</IconButton>
			</div>
			{showFilters && (
				<div className="flex justify-center mt-4">{Filters}</div>
			)}
			<div className="relative bottom-4 w-9/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
				{data && (
					<TableContainer component={Paper} sx={{ height: 550 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell align="right">
										שם משתמש
									</TableCell>
									<TableCell align="right">סוג</TableCell>
									<TableCell align="right">פעיל</TableCell>

									<TableCell align="right">
										מנהל מערכת
									</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row) => (
									<Rows
										key={row.username}
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

export default Registration;
