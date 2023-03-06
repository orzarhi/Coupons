import axios from "axios";
import { tokenCookies } from "~/services/cookiesService";

const token = tokenCookies.get();

export default axios.create({
	baseURL: "http://10.90.0.55/api",
	headers: {
		token,
		"Content-type": "application/json",
	},
});

// baseURL: "http://10.90.0.55:5000/api",
