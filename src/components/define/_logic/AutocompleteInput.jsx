import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export const AutocompleteInput = ({ options, onChange, label }) => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={options}
			getOptionLabel={(option) => option.label || ""}
			onChange={(_, value) => onChange(value)}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			sx={{ width: 200 }}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};
