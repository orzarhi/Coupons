import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useDeleteShift } from "~/hooks/useShifts";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateShift } = useDeleteShift(
		setOpen,
		open,
		refetch
	);
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={() => deleteMutateShift(info.shiftCode)}
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
								: "הוספת סוג משמרת חדשה"
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
