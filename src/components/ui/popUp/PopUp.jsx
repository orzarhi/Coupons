import React from "react";

const PopUp = ({ children, setOpen }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-50">
			<div className="bg-white w-3/4 flex flex-col max-w-xl rounded-2xl relative sm:overflow-y-scroll sm:w-3/4 sm:h-2/5 ">
				<div
					className="absolute text-3xl font-bold cursor-pointer text-black z-50 right-2"
					onClick={() => {
						setOpen({ ...open, popUp: false, action: false });
					}}
				>
					&times;
				</div>
				{children}
			</div>
		</div>
	);
};

export default PopUp;
