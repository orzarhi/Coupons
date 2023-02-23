import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useDeleteUser } from "~/hooks/useUsers";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateUser } = useDeleteUser(setOpen, open, refetch);
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={() => deleteMutateUser(info.usename)}
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
								: "הוספת עובד חדש"
						}
						setOpen={setOpen}
						open={open}
						refetch={refetch}
					/>
				</PopUp>
			)}
		</>
	);
};

export default Actions;
