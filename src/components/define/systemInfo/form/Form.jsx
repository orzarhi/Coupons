import React, { useRef } from "react";
import * as toastMessages from "~/utils/notification/index";
import { IconButton } from "@mui/material";
import { MdDone } from "react-icons/md";
import InputText from "../actions/InputText";
import { useUpdateSystemInfo } from "~/hooks/useSystemInfo";

export const Form = ({ title, info, setOpen, open, refetch }) => {
	const valueInputRef = useRef();
	const descriptionInputRef = useRef();

	const { mutate: updateMutateSystemInfo } = useUpdateSystemInfo(
		setOpen,
		open,
		refetch
	);

	const submitHandler = async (e) => {
		e.preventDefault();

		const value = valueInputRef?.current?.value;
		const description = descriptionInputRef?.current?.value;

		try {
			if (open.title === "edit") {
				const updateSystemInfo = {
					id: info?.id,
					value,
					description,
				};
				console.log("🤞 updateSystemInfo", updateSystemInfo);
				updateMutateSystemInfo(updateSystemInfo);
			}
		} catch (err) {
			toastMessages.errorMessage(err);
		}
	};

	return (
		<>
			<span className="block text-center text-2xl mb-2">{title}</span>
			<div className="flex flex-wrap justify-center m-4 p-4 gap-x-5 gap-y-3">
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.description}
					originalText={"תאור"}
					ref={descriptionInputRef}
				/>
				<InputText
					title={title}
					action={"עריכת נתונים"}
					info={info?.value}
					originalText={"מייל"}
					ref={valueInputRef}
				/>
			</div>
			<div className="flex items-end flex-col p-2">
				<IconButton
					className="!text-white !bg-cyan-600 !text-3xl"
					onClick={submitHandler}
				>
					<MdDone />
				</IconButton>
			</div>
		</>
	);
};
