import Scanner from "~/components/transactions/scanner/Scanner";
import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch, dataEmployee }) => {
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					// onClick={() => deleteMutation.mutate(rowId)}
					title={"האם אתה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					{open.title === "scanner" ? (
						<Scanner info={info} />
					) : (
						<Form
							title={
								open.title === "add-meals"
									? "הוספת קופון ארוחת צהריים חדש"
									: open.title === "add-various"
									? "הוספת קופון שונות חדש"
									: "דוח קופונים"
							}
							info={info}
							refetch={refetch}
							setOpen={setOpen}
							open={open}
							dataEmployee={dataEmployee}
						/>
					)}
				</PopUp>
			)}
		</>
	);
};

export default Actions;
