import { Button } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";
import { convertBoolean } from "~/utils/convertBoolean";

export const Xls = ({ data, title, content }) => {
	const handleExportXlsx = () => {
		var Heading = [
			[
				"קוד עובד",
				"קופון",
				"אורח",
				"תאריך הנפקה",
				"שומש",
				"תאריך מימוש",
				"עסק",
			],
		];

		const dataResult = data.map((d) => ({
			employeeCode: d.employeeCode,
			couponName: d.couponName,
			isGuest: convertBoolean(d.isGuest),
			issuedDate:
				new Date(d.issuedDate).toLocaleDateString() +
				" " +
				d.issuedDate.slice(11, 16),
			isUsed: convertBoolean(d.isUsed),
			usedDate:
				new Date(d.usedDate).getFullYear() > 2000
					? new Date(d.usedDate).toLocaleDateString() +
					  " " +
					  d.issuedDate.slice(11, 16)
					: null,

			supplierName: d.supplierName,
		}));

		var wb = XLSX.utils.book_new(),
			ws = XLSX.utils.json_to_sheet(dataResult);

		XLSX.utils.sheet_add_aoa(ws, Heading);
		XLSX.utils.book_append_sheet(wb, ws, title);

		XLSX.writeFile(wb, `${title}.xlsx`);
	};
	return (
		<div className="mr-5 flex justify-center">
			<Button
				variant="contained"
				color="inherit"
				onClick={handleExportXlsx}
			>
				{content}
			</Button>
		</div>
	);
};
