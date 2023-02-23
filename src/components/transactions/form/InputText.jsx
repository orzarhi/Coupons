import { TextField } from "@mui/material";
import { forwardRef, useState } from "react";

export const InputText = forwardRef((props, ref) => {
	const [value, setValue] = useState("2014-08-18T21:11:54");

	const handleChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<>
			{props.title === props.action ? (
				<TextField
					className="w-2/5 sm:!w-4/5"
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
			) : (
				<TextField
					className="w-2/5 sm:!w-full"
					inputRef={ref}
					required
					type="date"
				/>
			)}
		</>
	);
});
