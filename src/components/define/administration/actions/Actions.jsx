import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useDeleteAdministration } from "~/hooks/useAdministrations";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateCompany } = useDeleteAdministration(
		setOpen,
		open,
		refetch
	);
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={() => deleteMutateCompany(info.code)}
					title={"האם אתה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						info={info}
						title={
							open.title === "edit"
								? "עריכת נתונים"
								: "הוספת מנהלה חדשה"
						}
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
