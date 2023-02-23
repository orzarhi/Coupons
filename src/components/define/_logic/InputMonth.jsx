import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const InputMonth = forwardRef((props, ref) => {
	return (
		<>
			<TextField
				className="w-2/5 sm:!w-full"
				inputRef={ref}
				required
				type="month"
			/>
		</>
	);
});
