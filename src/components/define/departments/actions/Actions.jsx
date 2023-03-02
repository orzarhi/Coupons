import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import {
	useDeleteDepartment,
	useUnassignDepartmentToCompanyt,
} from "~/hooks/useDepartments";
import { useAuthStore } from "~/store/auth";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { token } = useAuthStore();

	const { mutate: deleteMutateDepartment } = useDeleteDepartment(
		setOpen,
		open,
		refetch
	);
	const { mutate: unassignMutateDepartmentToCompanyt } =
		useUnassignDepartmentToCompanyt(setOpen, open, refetch);

	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateDepartment(info.code, token);
		} else if (open.title === "delete-unassign") {
			const unassignDepartmentToCompanyt = {
				companyCode: open?.code,
				departmentCode: info?.code,
			};
			unassignMutateDepartmentToCompanyt(
				unassignDepartmentToCompanyt,
				token
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
								: "הוספת מחלקה חדשה"
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
