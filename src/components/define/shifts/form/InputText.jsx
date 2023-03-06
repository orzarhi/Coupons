import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const InputTextTime = forwardRef((props, ref) => {
	return (
		<>
			{props.title === props.action ? (
				<TextField
					className="w-2/5"
					autoComplete="false"
					defaultValue={
						props.title === props.action
							? props.info.slice(11, 16)
							: props.originalText
					}
					InputLabelProps={{ style: { color: "black" } }}
					label={props.originalText}
					inputRef={ref}
					required
					type="time"
				/>
			) : (
				<TextField
					className="w-2/5"
					autoComplete="false"
					InputLabelProps={{ style: { color: "black" } }}
					inputRef={ref}
					required
					type="time"
				/>
			)}
		</>
	);
});
export const InputText = forwardRef((props, ref) => {
	return (
		<>
			{props.title === props.action ? (
				<TextField
					className="w-3/5"
					autoComplete="false"
					defaultValue={
						props.title === props.action
							? props.info
							: props.originalText
					}
					InputLabelProps={{ style: { color: "black" } }}
					label={props.originalText}
					required
					inputRef={ref}
				/>
			) : (
				<TextField
					className="w-2/5"
					autoComplete="false"
					label={
						props.title === props.action
							? props.info
							: props.originalText
					}
					required
					inputRef={ref}
				/>
			)}
		</>
	);
});
