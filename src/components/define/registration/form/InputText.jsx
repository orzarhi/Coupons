import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef } from "react";
import { useUsersTypes } from "~/hooks/useUsersTypes";

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

// export const SelectType = ({ selectType, setSelectType, defaultValue }) => {
// 	const { data, isLoading } = useUsersTypes();

// 	const handleChange = (e) => {
// 		setSelectType(e.target.value);
// 	};

// 	return (
// 		<Box className="!w-2/5">
// 			<FormControl fullWidth>
// 				<InputLabel
// 					id="demo-simple-select-label"
// 					sx={{ direction: "rtl" }}
// 				>
// 					{defaultValue}
// 				</InputLabel>
// 				<Select
// 					labelId="demo-simple-select-label"
// 					id="demo-simple-select"
// 					value={selectType}
// 					label="סוג"
// 					onChange={handleChange}
// 					required
// 				>
// 					{!isLoading &&
// 						data?.map((type) => (
// 							<MenuItem key={type?.code} value={type?.code}>
// 								{type?.name}
// 							</MenuItem>
// 						))}
// 				</Select>
// 			</FormControl>
// 		</Box>
// 	);
// };
