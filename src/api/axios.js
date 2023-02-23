import axios from "axios";
// baseURL: "http://10.90.0.55:5000/api",

export default axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-type": "application/json",
	},
	withCredentials: true,
});
