import * as toastMessages from "./notification/index";

export const success = (
	data,
	setOpen,
	open,
	refetch,
	clearInputs = () => {}
) => {
	setOpen({ ...open, popUp: false, action: false, modalDialog: false });
	toastMessages.successMessage(data.Message);
	refetch();
	clearInputs();
};
