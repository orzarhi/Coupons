import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import {
	useDeleteCompany,
	useUnassignCompanyFromAdministration,
} from "~/hooks/useCompanies";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateCompany } = useDeleteCompany(
		setOpen,
		open,
		refetch
	);

	const { mutate: unassignMutateCompanyFromAdministration } =
		useUnassignCompanyFromAdministration(setOpen, open, refetch);
	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateCompany(info.companyCode);
		} else if (open.title === "delete-unassign") {
			const unassignCompanyFromAdministration = {
				companyCode: info?.companyCode,
				administrationCode: open?.code,
			};
			unassignMutateCompanyFromAdministration(
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
								: "הוספת חברה חדשה"
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
