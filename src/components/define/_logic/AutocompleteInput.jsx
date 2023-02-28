import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export const AutocompleteInput = ({ options, onChange, label }) => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={options}
			onChange={(_, value) => onChange(value)}
			isOptionEqualToValue={(option, value) =>
				option.id === value.supplierCode
			}
			sx={{ width: 200 }}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};

