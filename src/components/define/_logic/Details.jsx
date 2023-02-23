import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import clsx from "clsx";

const Details = ({
	title,
	setOpen,
	open,
	textBtn = "",
	label = "",
	identification = "",
	showBtn = true,
	showTextField = true,
	className,
	setInputSearch = () => {},
}) => {
	return (
		<>
			<span className="block text-center text-2xl">{title}</span>
			<div className="flex flex-col items-center mt-2">
				{showBtn && (
					<Button
						className={clsx(className)}
						onClick={() =>
							setOpen({
								...open,
								popUp: true,
								action: true,
								title:
									identification === "report"
										? identification
										: "add",
							})
						}
					>
						{textBtn}
					</Button>
				)}
				{showTextField && (
					<TextField
						id="outlined-search"
						label={label}
						type="search"
						className="!mt-5"
						placeholder={`חפש שם ${label}...`}
						onChange={(e) => setInputSearch(e.target.value)}
					/>
				)}
			</div>
		</>
	);
};

export default Details;
