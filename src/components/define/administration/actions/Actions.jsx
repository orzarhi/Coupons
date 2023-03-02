import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useDeleteAdministration } from "~/hooks/useAdministrations";
import { useUnassignCompanyFromAdministration } from "~/hooks/useCompanies";
import { useUnassignAdminFromAdministration } from "~/hooks/useEmployees";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateCompany } = useDeleteAdministration(
		setOpen,
		open,
		refetch
	);

	const { mutate: unassignMutateCompanyFromAdministration } =
		useUnassignCompanyFromAdministration(setOpen, open, refetch);

	const { mutate: unassignMutateAdminFromAdministration } =
		useUnassignAdminFromAdministration(setOpen, open, refetch);

	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateCompany(info.code);
		} else if (open.title === "delete-unassign") {
			const unassignCompanyFromAdministration = {
				companyCode: open?.code,
				administrationCode: info?.code,
			};

			unassignMutateCompanyFromAdministration(
				unassignCompanyFromAdministration
			);
		} else if (open.title === "delete-unassignToEmployee") {
			const unassignCompanyFromAdministration = {
				employeeCode: open?.code,
				administrationCode: info?.code,
			};

			unassignMutateAdminFromAdministration(
				unassignCompanyFromAdministration
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
								: open.title ===
								  "assignAdministrationToCompanies"
								? `שיוך מנהלה - ${info.name}`
								: open.title === "assignAdministrationToAdmin"
								? `שיוך מנהלה - ${info.name}`
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
