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
	} else if (title === "assignAdministrationToCompanies") {
		setOpen({
			...open,
			popUp: true,
			action: true,
			title: "assignAdministrationToCompanies",
			code: code,
		});
	} else if (title === "assignAdministrationToAdmin") {
		setOpen({
			...open,
			popUp: true,
			action: true,
			title: "assignAdministrationToAdmin",
			code: code,
		});
	} else if (title === "assignCompanieToDepartment") {
		setOpen({
			...open,
			popUp: true,
			action: true,
			title: "assignCompanieToDepartment",
			code: code,
		});
	} else if (title === "delete-unassignToDepartment") {
		setOpen({
			...open,
			modalDialog: true,
			action: true,
			title: "delete-unassignToDepartment",
			code: code,
		});
	} else if (title === "assignCompanieToCoupon") {
		setOpen({
			...open,
			popUp: true,
			action: true,
			title: "assignCompanieToCoupon",
			code: code,
		});
	} else if (title === "delete-unassignToCoupon") {
		setOpen({
			...open,
			modalDialog: true,
			action: true,
			title: "delete-unassignToCoupon",
			code: code,
		});
	} else if (title === "assignSuppliersToCoupon") {
		setOpen({
			...open,
			popUp: true,
			action: true,
			title: "assignSuppliersToCoupon",
			code: code,
		});
	}
	setInfo(row);
};
