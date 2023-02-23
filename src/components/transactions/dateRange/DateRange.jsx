import { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";
import "./DateRange.css";

export const DateRange = ({ data, setData, className }) => {
	const [dates, setDates] = useState(new Date());
	const [firstRound, setFirstRound] = useState(false);

	// useEffect(() => {
	// 	if (!firstRound) {
	// 		setFirstRound(true);
	// 		return;
	// 	} else if (dates === "" || !dates) {
	// 		return setData(data);
	// 	}
	// 	filterByDates(data, setData, dates[0], dates[1]);
	// }, [dates]);

	return (
		<DateRangePicker
			size="lg"
			appearance="subtle"
			placeholder="חיתוך תאריכים"
			className="!z-50"
			format="dd-MM-yyyy"
			selected={dates}
			onChange={(date) => setDates(date)}
		/>
	);
};
