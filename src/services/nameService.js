import Cookies from "universal-cookie";
const cookies = new Cookies();

class nameService {
	constructor(name) {
		this.name = name;
	}

	get() {
		return cookies.get(this.name);
	}

	set(name) {
		cookies.set(this.name, name);
	}

	remove() {
		cookies.remove(this.name);
	}
}
export const nameCookies = new nameService("name");
