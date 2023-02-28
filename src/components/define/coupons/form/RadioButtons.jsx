import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";

export const RadioButtons = ({
	title,
	defaultValue = "",
	firstLabel = "כן",
	secondeLabel = "לא",
	setRadioButtons,
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
				defaultValue={defaultValue}
			>
				<FormControlLabel
					value="true"
					control={<Radio />}
					label={firstLabel}
				/>
				<FormControlLabel
					value="false"
					control={<Radio />}
					label={secondeLabel}
				/>
			</RadioGroup>
		</FormControl>
	);
};
