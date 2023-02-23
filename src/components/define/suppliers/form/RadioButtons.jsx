import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";

export const RadioButtons = ({
	title,
	setRadioButtons,
	radioButtons,
	identification,
	defaultValue,
	type,
}) => {
	const handleChange = (e) => {
		const value = e.target.value;
		if (identification === "meals") {
			setRadioButtons({ ...radioButtons, isMeals: value });
		} else if (identification === "various") {
			setRadioButtons({ ...radioButtons, isVarious: value });
		} else if (identification === "active") {
			setRadioButtons({ ...radioButtons, isActive: value });
		}
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
				defaultValue={type === "add" ? "" : defaultValue}
				required
			>
				<FormControlLabel value="true" control={<Radio />} label="כן" />
				<FormControlLabel
					value="false"
					control={<Radio />}
					label="לא"
				/>
			</RadioGroup>
		</FormControl>
	);
};
