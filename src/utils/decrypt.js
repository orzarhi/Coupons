import CryptoJS from "crypto-js";
const SECRET_CODE = import.meta.env.VITE_SECRET_CODE;

export const decrypt = (text) => {
	const bytes = CryptoJS.AES.decrypt(text, SECRET_CODE);
	const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

	return decryptedData;
};
