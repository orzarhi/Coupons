import Cookies from "universal-cookie";
const cookies = new Cookies();

class cookiesService {
	constructor(name) {
		this.name = name;
	}

	get() {
		return cookies.get(this.name);
	}

	set(token) {
		cookies.set(this.name, token, {
			path: "/",
			expires: new Date(new Date().getTime() + 60 * 60 * 30000), // 24 Hours
		});
	}

	remove() {
		cookies.remove(this.name);
	}
}
export const tokenCookies = new cookiesService("token");
