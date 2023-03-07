import axios from "axios";
import { tokenCookies } from "~/services/cookiesService";

const token = tokenCookies.get();

export default axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		token,
		"Content-type": "application/json",
	},
});

// baseURL: "http://10.90.0.55/api",
