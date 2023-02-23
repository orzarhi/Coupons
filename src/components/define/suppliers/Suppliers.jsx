import { DataGrid, heIL } from "@mui/x-data-grid";
import { useState } from "react";
import Spinner from "~/components/ui/spinner/Spinner";
import { useSuppliers } from "~/hooks/useSuppliers";
import Details from "../_logic/Details";
import Actions from "./actions/Actions";
import { columns } from "./columns";

const Suppliers = () => {
	const [info, setInfo] = useState({});
	const [inputSearch, setInputSearch] = useState("");

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
	const columnsResult = columns(setOpen, open, setInfo);

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
			<div className="relative bottom-4 w-3/4 block m-auto p-5 xl:w-11/12 xl:relative xl:bottom-4">
				{dataSuppliers && (
					<DataGrid
						rows={data}
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
