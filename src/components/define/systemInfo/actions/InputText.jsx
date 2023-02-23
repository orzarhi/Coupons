import { TextField } from "@mui/material";
import { forwardRef } from "react";

const InputText = forwardRef((props, ref) => {
	return (
		<>
			<TextField
				className="w-2/5"
				autoComplete="false"
				defaultValue={
					props.title === props.action
						? props.info
						: props.originalText
				}
				InputLabelProps={{ style: { color: "black" } }}
				label={props.originalText}
				inputRef={ref}
				required
			/>
		</>
	);
});

export default InputText;
