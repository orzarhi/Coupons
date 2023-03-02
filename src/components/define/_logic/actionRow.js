export const actionRow = (setOpen, open, setInfo, row, title, code = "") => {
	if (title === "delete") {
		setOpen({
			...open,
			modalDialog: true,
			action: true,
			title: "delete",
		});
	} else if (title === "edit") {
		setOpen({ ...open, popUp: true, action: true, title: "edit" });
	} else if (title === "scanner") {
		setOpen({ ...open, popUp: true, action: true, title: "scanner" });
	} else if (title === "assign") {
		setOpen({ ...open, popUp: true, action: true, title: "assign" });
	} else if (title === "delete-unassign") {
		setOpen({
			...open,
			modalDialog: true,
			action: true,
			title: "delete-unassign",
			code: code,
		});
	} else if (title === "delete-unassignToSupplier") {
		setOpen({
			...open,
			modalDialog: true,
			action: true,
			title: "delete-unassignToSupplier",
			code: code,
		});
	} else if (title === "delete-unassignToEmployee") {
		setOpen({
			...open,
			modalDialog: true,
			action: true,
			title: "delete-unassignToEmployee",
			code: code,
		});
	}
	setInfo(row);
};
