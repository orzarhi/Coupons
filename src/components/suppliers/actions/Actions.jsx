import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { Form } from "../form/Form";

const Actions = ({ setOpen, open, dataSupplier }) => {
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					title={"האם אתה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						title={open.title === "report" && "דוח קופונים"}
						setOpen={setOpen}
						open={open}
						dataSupplier={dataSupplier}
					/>
				</PopUp>
			)}
		</>
	);
};

export default Actions;
