import PopUp from "~/components/ui/popUp/PopUp";
import { Form } from "../form/Form";

const Actions = ({
	setOpen,
	open,
	fetchReport,
	setShowReport,
	setDates,
	dates,
}) => {
	return (
		<>
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						title={"דוח מנהלה"}
						setOpen={setOpen}
						open={open}
						fetchReport={fetchReport}
						setShowReport={setShowReport}
						setDates={setDates}
						dates={dates}
					/>
				</PopUp>
			)}
		</>
	);
};

export default Actions;
