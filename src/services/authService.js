import { tokenCookies } from "./cookiesService";
import { nameCookies } from "./nameService";

export const login = (token) => {
	tokenCookies.set(token);
	// nameCookies.set(name);
};

export const logout = () => {
	tokenCookies.remove();
	nameCookies.remove();
	window.location.href = "/login";
};
