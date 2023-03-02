import axios from "axios";
import { tokenCookies } from "~/services/cookiesService";

const token = tokenCookies.get();

console.log("🏡 token:", token);

export default axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		token,
		"Content-type": "application/json",
	},
});

// baseURL: "http://10.90.0.55:5000/api",
