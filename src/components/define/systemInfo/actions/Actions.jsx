import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { Form } from "../form/Form";

export const Actions = ({ setOpen, open, info, refetch }) => {
	return (
		<>
			{/* {open.modalDialog && (
				<ModalDialog
					onClick={() => deleteMutateUserType(info.code)}
					title={"האם אתה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)} */}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						title={
							open.title === "edit"
								? "עריכת נתונים"
								: "הוספת הגדרה חדשה"
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
