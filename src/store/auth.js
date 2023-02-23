import { create } from "zustand";
import { tokenCookies } from "~/services/cookiesService";
import { decodeToken } from "react-jwt";
import { nameCookies } from "~/services/nameService";

export const useAuthStore = create((set) => ({
	token: tokenCookies.get(),
	username: decodeToken(tokenCookies.get())?.username,
	type: decodeToken(tokenCookies.get())?.type,
	isLoggedIn: !!tokenCookies.get(),
	isSysAdmin: decodeToken(tokenCookies.get())?.isSysAdmin,
	name: nameCookies.get(),

	loginStore: (token) =>
		set({
			isLoggedIn: true,
			token: tokenCookies.set(token),
			token: tokenCookies.get(),
			type: decodeToken(token)?.type,
			username: decodeToken(token)?.username,
			isSysAdmin: decodeToken(token)?.isSysAdmin,
			name: nameCookies.get(),
		}),
	logoutStore: () =>
		set({
			isLoggedIn: false,
			isSysAdmin: false,
			token: tokenCookies.remove(),
			name: nameCookies.remove(),
		}),
}));
