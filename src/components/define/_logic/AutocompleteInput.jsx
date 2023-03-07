import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export const AutocompleteInput = ({
	options,
	onChange,
	label,
	isLoading = false,
}) => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			className="sm:!w-11/12"
			options={options}
			getOptionLabel={(option) => option && option?.label}
			onChange={(_, value) => onChange(value)}
			isOptionEqualToValue={(option, value) => option?.id === value?.id}
			sx={{ width: 200 }}
			disabled={isLoading}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};
