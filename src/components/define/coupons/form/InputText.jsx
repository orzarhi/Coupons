import { TextField, Autocomplete } from "@mui/material";
import React, { forwardRef } from "react";

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
					label={props.originalText}
					required
					inputRef={ref}
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

export const SupplierAutocompleteInput = ({ options, onChange, label }) => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={options}
			getOptionLabel={(option) => option.label || ""}
			onChange={(_, value) => onChange(value)}
			isOptionEqualToValue={(option, value) =>
				option.id === value.supplierCode
			}
			sx={{ width: 200 }}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};

export const CompanyCodeAutocompleteInput = ({ options, onChange, label }) => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={options}
			getOptionLabel={(option) => option.label || ""}
			onChange={(_, value) => onChange(value)}
			isOptionEqualToValue={(option, value) =>
				option.id === value.companyCode
			}
			sx={{ width: 200 }}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
};
