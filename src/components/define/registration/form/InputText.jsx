import { TextField } from "@mui/material";
import { forwardRef } from "react";

export const InputText = forwardRef((props, ref) => {
	return (
		<>
			{props.originalText === "סיסמא" && (
				<TextField
					className="w-2/5"
					autoComplete="false"
					InputLabelProps={{ style: { color: "black" } }}
					defaultValue={props.info}
					label={"סיסמא"}
					inputRef={ref}
				/>
			)}
			{props.originalText !== "סיסמא" && (
				<TextField
					className="w-2/5"
					autoComplete="false"
					InputLabelProps={{ style: { color: "black" } }}
					defaultValue={props.info}
					inputRef={ref}
					label={`${props.originalText} - לא ניתן לעריכה`}
					InputProps={{
						readOnly: true,
					}}
				/>
			)}
		</>
	);
});
