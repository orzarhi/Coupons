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
import { useCompanies } from "~/hooks/useCompanies";
import { useAuthStore } from "~/store/auth";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import Rows from "./Rows";

const Companies = () => {
	const { token } = useAuthStore();

	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");
	const [checkedboxIsActive, setCheckedboxIsActive] = useState(false);
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const {
		data: dataCompanies,
		refetch,
		isLoading: isLoadingCompanies,
	} = useCompanies(token);

	const data = dataCompanies?.filter((company) =>
		company.companyName.toLowerCase().includes(inputSearch.toLowerCase())
	);
	const dataCheckedIsActive = dataCompanies?.filter(
		(companie) => companie.isActive
	);
	const dataResult = checkedboxIsActive ? dataCheckedIsActive : data;

	if (isLoadingCompanies) return <Spinner />;

	return (
		<>
			<Details
				title="הגדרת חברות"
				textBtn="הוספת חברה חדשה"
				setOpen={setOpen}
				open={open}
				setInputSearch={setInputSearch}
				label="חברה"
				className="!bg-green-700 !text-white hover:!bg-green-600 !w-60 !text-sm"
			/>
			<div className="flex justify-center mt-4">
				<FormControlLabel
					control={<Checkbox defaultValue={false} />}
					label="פעיל"
					onClick={() => setCheckedboxIsActive(!checkedboxIsActive)}
				/>
			</div>
			<div className="relative bottom-4 w-4/5 block m-auto p-5 xl:w-9/12 xl:relative xl:bottom-4">
				{data && (
					<TableContainer component={Paper} sx={{ height: 600 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell align="right">קוד</TableCell>
									<TableCell align="right">שם</TableCell>
									<TableCell align="right">מייל</TableCell>
									<TableCell align="right">
										מספר טלפון
									</TableCell>
									<TableCell align="right">לוגו</TableCell>
									<TableCell align="right">שיוך</TableCell>
									<TableCell align="right">פעיל</TableCell>
									<TableCell align="right">פעולות</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataResult?.map((row) => (
									<Rows
										key={row.companyCode}
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

export default Companies;
