import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { forwardRef } from "react";
export const InputText = forwardRef((props, ref) => {
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

export const SelectAdministrations = ({
	administrations,
	setAdministrations,
}) => {
	//TODO: Call getAdministrations
	// const { data, isLoading } = useCompanies();

	const handleChange = (e) => {
		setAdministrations(e.target.value);
	};

	return (
		<Box className="!w-2/5">
			<FormControl fullWidth>
				<InputLabel
					id="demo-simple-select-label"
					sx={{ direction: "rtl" }}
				>
					סוג
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={administrations}
					label="סוג"
					onChange={handleChange}
					required
				>
					{/* {!isLoading &&
						data?.map((type) => (
							<MenuItem key={type?.code} value={type?.code}>
								{type?.name}
							</MenuItem>
						))} */}
				</Select>
			</FormControl>
		</Box>
	);
};
