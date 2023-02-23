import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const InputText = forwardRef((props, ref) => {
	return (
		<>
			<TextField
				className="w-2/5"
				autoComplete="false"
				label={props.originalText}
				inputRef={ref}
				required
			/>
		</>
	);
});
