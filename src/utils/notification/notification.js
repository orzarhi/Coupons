import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successMessage = (message) => {
	return toast.success(message);
};

export const errorMessage = (message) => {
	return toast.error(message);
};

export const infoMessage = (message) => {
	return toast.info(message);
};
