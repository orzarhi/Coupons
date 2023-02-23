import { TextField } from "@mui/material";
import React, { forwardRef } from "react";

const InputText = forwardRef((props, ref) => {
	return (
		<>
			{props.title === props.action ? (
				<TextField
					className="w-2/5"
					autoComplete="false"
					defaultValue={
						props.title === props.action
							? props.info
							: props.originalText
					}
					InputLabelProps={{ style: { color: "black" } }}
					label={
						props.originalText === "שם משתמש"
							? `${props.originalText} - לא ניתן לעריכה `
							: props.originalText
					}
					required
					inputRef={ref}
					InputProps={{
						readOnly:
							props.originalText === "שם משתמש" ? true : false,
					}}
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

export default InputText;
