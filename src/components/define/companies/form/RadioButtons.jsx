import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";

export const RadioButtonsThreeOptions = ({
	title,
	type,
	setRadioButtons,
	defaultValue,
}) => {
	const handleChange = (e) => {
		const value = e.target.value;
		setRadioButtons(value);
	};
	return (
		<FormControl className="!mt-4">
			<FormLabel
				id="demo-row-radio-buttons-group-label"
				className="!block !text-center !text-lg !text-gray-900 "
			>
				{title}
			</FormLabel>
			<RadioGroup
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
				className="!block !text-center"
				onChange={handleChange}
				required
				defaultValue={type === "edit" && defaultValue}
			>
				<FormControlLabel value="1" control={<Radio />} label="כן" />
				<FormControlLabel value="0" control={<Radio />} label="לא" />
				<FormControlLabel
					value="false"
					control={<Radio />}
					label="לא"
				/>
			</RadioGroup>
		</FormControl>
	);
};
