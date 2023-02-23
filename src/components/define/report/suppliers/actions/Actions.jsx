import PopUp from "~/components/ui/popUp/PopUp";
import { Form } from "../form/Form";

const Actions = ({
	setOpen,
	open,
	fetchReport,
	setShowReport,
	setMonth,
	setYear,
}) => {
	return (
		<>
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						title={"דוח ספק"}
						setOpen={setOpen}
						open={open}
						fetchReport={fetchReport}
						setShowReport={setShowReport}
						setMonth={setMonth}
						setYear={setYear}
					/>
				</PopUp>
			)}
		</>
	);
};

export default Actions;
