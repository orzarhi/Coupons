import * as toastMessages from "./notification/index";

export const error = (data) => {
	const error = data?.response?.data?.Message;
	if (error) toastMessages.errorMessage(error);
	else toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת");
};
