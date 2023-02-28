import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export const AutocompleteInput = ({ options, onChange, label }) => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={options}
			onChange={(_, value) => onChange(value)}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};
