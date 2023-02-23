import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const InputDates = forwardRef((props, ref) => {
	return (
		<>
			<TextField
				className="w-2/5 sm:!w-full"
				inputRef={ref}
				type="date"
				required
			/>
		</>
	);
});
