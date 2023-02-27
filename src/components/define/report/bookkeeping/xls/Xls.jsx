import { Button } from "@mui/material";
import React from "react";
import * as XLSX from "xlsx";

export const Xls = ({ data, title, content }) => {
	const handleExportXlsx = () => {
		var Heading = [
			[
				"קוד עובד",
				"סך הכל ארוחות",
				"חברה",
				"מחלקה",
				"חברה",
				"ארוחות ללא חיוב",
				"בדיקה",
			],
		];
		var wb = XLSX.utils.book_new(),
			ws = XLSX.utils.json_to_sheet(data);

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
