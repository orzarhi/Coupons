import { Checkbox, FormControlLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useSuppliers } from "~/hooks/useSuppliers";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

const Suppliers = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [checkedboxIsActive, setCheckedboxIsActive] = useState(false);
	const [checkedboxIsMeals, setCheckedboxIsMeals] = useState(false);
	const [checkedboxIsVarious, setCheckedboxIsVarious] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data: dataSuppliers, refetch, isLoading } = useSuppliers();

	const data = dataSuppliers?.filter((supplier) =>
		supplier.supplierName.toLowerCase().includes(inputSearch.toLowerCase())
	);

	const dataCheckedIsActive = dataSuppliers?.filter(
		(supplier) => supplier.isActive
	);

	const dataCheckedIsMeals = dataSuppliers?.filter(
		(supplier) => supplier.isMeals
	);

	const dataCheckedIsVarious = dataSuppliers?.filter(
		(supplier) => supplier.isVarious
	);
	const dataResults = checkedboxIsActive
		? dataCheckedIsActive
		: checkedboxIsMeals
		? dataCheckedIsMeals
		: checkedboxIsVarious
		? dataCheckedIsVarious
		: data;
	if (isLoading) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת ספק"
				textBtn="הוספת ספק חדש"
				setOpen={setOpen}
				open={open}
				setInputSearch={setInputSearch}
				label="ספק"
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>
			<div className="flex justify-center mt-4">
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="פעיל"
					onClick={() => setCheckedboxIsActive(!checkedboxIsActive)}
				/>
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="ספק ארוחות"
					onClick={() => setCheckedboxIsMeals(!checkedboxIsMeals)}
				/>
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="ספק שונות"
					onClick={() => setCheckedboxIsVarious(!checkedboxIsVarious)}
				/>
			</div>
			<div className="relative bottom-4 w-3/4 block m-auto p-5 xl:w-11/12 xl:relative xl:bottom-4">
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
									<TableCell align="right">מייל</TableCell>
									<TableCell align="right">
										מספר פלאפון
									</TableCell>
									<TableCell align="right">ח.פ</TableCell>
									<TableCell align="right">פעיל</TableCell>
									<TableCell align="right">
										ספק ארוחות
									</TableCell>

									<TableCell align="right">
										ספק שונות
									</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataResults?.map((row) => (
									<Rows
										key={row.supplierCode}
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

export default Suppliers;

{
	/* <div className="relative bottom-4 w-3/4 block m-auto p-5 xl:w-11/12 xl:relative xl:bottom-4">
				{dataSuppliers && (
					<DataGrid
						rows={
							checkedboxIsActive
								? dataCheckedIsActive
								: checkedboxIsMeals
								? dataCheckedIsMeals
								: data
						}
						columns={columnsResult}
						pageSize={25}
						sx={{
							height: 550,
							direction: "ltr",
						}}
						getRowId={(row) => row.supplierCode}
						localeText={
							heIL.components.MuiDataGrid.defaultProps.localeText
						}
					/>
				)}
			</div> */
}
