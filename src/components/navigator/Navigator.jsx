import { createElement, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import maxsoftIcon from "~/assets/images/picture-login/maxsoft.png";
import { useAuthStore } from "~/store/auth";
import { menus } from "./menus";

const Navigator = () => {
	const { logoutStore } = useAuthStore();
	const [open, setOpen] = useState(true);

	return (
		<section className="flex gap-6 absolute top-0 z-50 xl:top-20">
			<div
				className={` bg-blue-50 min-h-screen ${
					open ? "w-60 xl:w-48" : "w-16 xl:w-10"
				} duration-700 text-gray-900 px-4 xl:px-0`}
			>
				<div className="py-3 flex justify-end">
					<HiMenuAlt3
						size={26}
						className="cursor-pointer"
						onClick={() => setOpen(!open)}
					/>
				</div>
				{open && (
					<Link to="/">
						<img
							className="w-30 h-10 sm:w-4/5"
							src={maxsoftIcon}
							alt="maxsoft-icon"
						/>
					</Link>
				)}
				<div className="mt-4 flex flex-col gap-4 relative">
					{menus?.map((menu, i) => (
						<Link
							to={menu?.link}
							key={i}
							className={` ${
								menu?.margin && "mt-5 xl:mt-5"
							} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-400 rounded-md`}
							onClick={() => {
								menu?.onClick && logoutStore();
							}}
						>
							<div
								title={menu?.title}
								className="sm:flex justify-end items-start"
							>
								{createElement(menu?.icon, {
									size: "20",
								})}
							</div>
							<h2
								style={{
									transitionDelay: `${i + 3}00ms`,
								}}
								className={`whitespace-pre duration-700 ${
									!open &&
									"opacity-0 translate-x-300 overflow-hidden"
								}`}
							>
								{menu?.name}
							</h2>
							<h2
								className={`${
									open && "hidden"
								} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
							>
								{menu?.name}
							</h2>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Navigator;
