import { Autocomplete, TextField } from "@mui/material";
import { forwardRef } from "react";

export const InputText = forwardRef((props, ref) => {
	return (
		<>
			<TextField
				className="w-2/5"
				autoComplete="false"
				label={props.originalText}
				inputRef={ref}
				required
			/>
		</>
	);
});

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
			options={options}
			getOptionLabel={(option) =>
				option && `${option?.label} - ${option?.id}`
			}
			onChange={(_, value) => onChange(value)}
			isOptionEqualToValue={(option, value) => option?.id === value?.id}
			sx={{ width: 230 }}
			disabled={isLoading}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};
