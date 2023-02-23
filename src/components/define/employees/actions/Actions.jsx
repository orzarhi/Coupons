import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import {
	useDeleteEmployee,
	useUnassignAdminFromAdministration,
} from "~/hooks/useEmployees";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateEmployee } = useDeleteEmployee(
		setOpen,
		open,
		refetch
	);
	const { mutate: unassignMutateAdminFromAdministration } =
		useUnassignAdminFromAdministration(setOpen, open, refetch);

	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateEmployee(info.employeeCode);
		} else if (open.title === "delete-unassign") {
			const unassignAdminFromAdministration = {
				employeeCode: info?.employeeCode,
				administrationCode: open?.code,
			};
			unassignMutateAdminFromAdministration(
				unassignAdminFromAdministration
			);
		}
	};

	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={submitHandler}
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
