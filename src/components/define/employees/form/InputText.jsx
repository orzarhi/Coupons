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

export const SelectInputCompanyandDepartment = ({
	title,
	action,
	type,
	defaultValue,
	selectedValue,
	setSelectedValue,
	data,
	isLoading,
}) => {
	const handleChange = (e) => {
		const value = e.target.value;

		if (title === "company")
			setSelectedValue({ ...selectedValue, company: value });
		else if (title === "department")
			setSelectedValue({ ...selectedValue, department: value });
	};

	return (
		<Box className="!w-2/5">
			<FormControl fullWidth>
				<InputLabel
					id="demo-simple-select-label"
					sx={{ direction: "rtl" }}
				>
					{action === "edit" ? defaultValue : type}
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={
						title === "company"
							? selectedValue.company
							: selectedValue.department
					}
					label={action === "edit" ? defaultValue : type}
					onChange={handleChange}
					required
					defaultValue={action === "edit" ? defaultValue : type}
				>
					{!isLoading &&
						data?.map((type) => (
							<MenuItem key={type?.code} value={type?.code}>
								{type?.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</Box>
	);
};
