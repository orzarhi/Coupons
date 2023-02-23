import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useDeleteSupplier } from "~/hooks/useSuppliers";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateSupplier } = useDeleteSupplier(
		setOpen,
		open,
		refetch
	);
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={() => deleteMutateSupplier(info.supplierCode)}
					title={"האם אתה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						title={
							open.title === "edit"
								? "עריכת נתונים"
								: "הוספת ספק חדש"
						}
						info={info}
						refetch={refetch}
						setOpen={setOpen}
						open={open}
					/>
				</PopUp>
			)}
		</>
	);
};

export default Actions;
