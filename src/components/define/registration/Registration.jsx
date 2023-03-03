import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { DataGrid, heIL } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useUsers } from "~/hooks/useUsers";
import { AutocompleteInput } from "../_logic/AutocompleteInput";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";
import { FaFilter } from "react-icons/fa";
import { useReducer } from "react";
import { FilterFields } from "~/constants/FilterFields";

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

	const [filters, dispatch] = useReducer(
		filterReducer,
		initialFiltersReducer
	);
	console.log("🚀 state:", filters);

	const [showFilters, setShowFilters] = useState(false);

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

	const columnsResult = columns(setOpen, open, setInfo);

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
				{/* <AutocompleteInput
					options={dataUsers?.map((user) => ({
						label: user.username,
						id: user.username,
					}))}
					// onChange={onAdministrationsAtuoCompleteChange}
					label={"פילטרים"}
				/> */}
				<IconButton onClick={() => setShowFilters(!showFilters)}>
					<FaFilter />
				</IconButton>
			</div>
			{showFilters && (
				<div className="flex justify-center mt-4">{Filters}</div>
			)}
			<div className="relative bottom-4 w-2/5 block m-auto p-5 xl:w-4/6 xl:relative xl:bottom-4 lg:w-4/6 md:w-5/6 sm:w-4/5">
				{dataUsers && (
					<DataGrid
						rows={data}
						columns={columnsResult}
						pageSize={25}
						rowsPerPageOptions={[25]}
						sx={{
							height: 600,
							direction: "ltr",
						}}
						getRowId={(row) => row.username}
						localeText={
							heIL.components.MuiDataGrid.defaultProps.localeText
						}
					/>
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
