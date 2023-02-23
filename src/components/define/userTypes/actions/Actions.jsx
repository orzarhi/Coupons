import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useDeleteUserTypes } from "~/hooks/useUsersTypes";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateUserType } = useDeleteUserTypes(
		setOpen,
		open,
		refetch
	);
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={() => deleteMutateUserType(info.code)}
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
								: "הוספת סוג משתמש חדש"
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
