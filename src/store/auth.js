import { create } from "zustand";
import { tokenCookies } from "~/services/cookiesService";
import { decodeToken } from "react-jwt";
import { nameCookies } from "~/services/nameService";

export const mainStore = (set) => {
	const token = tokenCookies.get();
	const decodedToken = decodeToken(token);

	const loginStore = (currentToken) => {
		const decodedToken = decodeToken(currentToken);
		tokenCookies.set(currentToken);

		set({
			isLoggedIn: true,
			token: currentToken,
			type: decodedToken?.type,
			username: decodedToken?.username,
			isSysAdmin: decodedToken?.isSysAdmin,
			name: nameCookies.get(),
		});
	};

	const logoutStore = () => {
		tokenCookies.remove();
		nameCookies.remove();
		set({
			isLoggedIn: false,
			isSysAdmin: false,
			token: undefined,
			name: undefined,
		});
	};

	return {
		token,
		username: decodedToken?.username,
		type: decodedToken?.type,
		isLoggedIn: !!token,
		isSysAdmin: decodedToken?.isSysAdmin,
		name: nameCookies.get(),
		loginStore,
		logoutStore,
	};
};

export const useAuthStore = create(mainStore);
