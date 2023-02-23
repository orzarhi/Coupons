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
	defaultValue,
	type,
	identification,
}) => {
	const handleChange = (e) => {
		const value = e.target.value;

		if (identification === "sunday") {
			setRadioButtons({ ...radioButtons, isSunday: value });
		} else if (identification === "monday") {
			setRadioButtons({ ...radioButtons, isMonday: value });
		} else if (identification === "tuesday") {
			setRadioButtons({ ...radioButtons, isTuesday: value });
		} else if (identification === "wednesday") {
			setRadioButtons({ ...radioButtons, isWednesday: value });
		} else if (identification === "thursday") {
			setRadioButtons({ ...radioButtons, isThursday: value });
		} else if (identification === "friday") {
			setRadioButtons({ ...radioButtons, isFriday: value });
		} else if (identification === "saturday") {
			setRadioButtons({ ...radioButtons, isSaturday: value });
		} else if (identification === "withoutCharge") {
			setRadioButtons({ ...radioButtons, isWithoutCharge: value });
		} else if (identification === "active") {
			setRadioButtons({ ...radioButtons, isActive: value });
		}
	};
	return (
		<FormControl className="!mt-4 !mr-2">
			<FormLabel
				id="demo-row-radio-buttons-group-label"
				className="!block !text-center !text-lg !text-gray-900"
			>
				{title}
			</FormLabel>
			<RadioGroup
				row
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
				className="!block !text-center"
				onChange={handleChange}
				defaultValue={defaultValue}
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
