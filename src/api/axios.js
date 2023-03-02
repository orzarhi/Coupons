import axios from "axios";
// baseURL: "http://10.90.0.55:5000/api",
import Cookies from "universal-cookie";
const cookies = new Cookies();
// const token = cookies.get("auth");

export default axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		token: cookies.get("auth"),
		"Content-type": "application/json",
	},
	// withCredentials: true,
});
