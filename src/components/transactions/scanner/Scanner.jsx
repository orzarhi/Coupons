import { useEffect, useState } from "react";
import { generateQR } from "~/utils/createQr";

export const Scanner = ({ info }) => {
	const [qr, setQr] = useState("");

	useEffect(() => {
		generateQR(info?.couponNumber).then((res) => {
			setQr(res);
		});
	}, []);

	return (
		<>
			<div className="flex flex-col justify-center items-center text-3xl mt-2">
				<span className="text-2xl font-bold tracking-tight text-red-700 dark:text-white">
					{info?.isGuest && "אורח"}
				</span>
				<span>{info?.couponName}</span>
				<span>{new Date(info?.issuedDate).toLocaleDateString()}</span>
			</div>
			<img src={qr} alt="qr-barcode" />
		</>
	);
};

export default Scanner;
