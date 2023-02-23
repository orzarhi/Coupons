import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = () => {
	return (
		<div className="flex justify-center items-center mt-32">
			<BeatLoader color="#000000" />
		</div>
	);
};

export default Spinner;
