import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { createElement, Fragment, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import maxsoftIcon from "~/assets/images/picture-login/maxsoft.png";
import { menus, reports, settings } from "./menus";

export const Navigator = () => {
	const [openMenu, setOpenMenu] = useState(true);
	const [openReport, setOpenReport] = useState(false);
	const [state, setState] = useState({
		right: true,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
			}}
			role="presentation"
			onClick={toggleDrawer(anchor, true)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			{state.right && (
				<img
					className="w-4/5 h-14 mt-5 mr-5 sm:w-4/5"
					src={maxsoftIcon}
					alt="maxsoft-icon"
				/>
			)}
			<List>
				{menus?.map((menu, i) => (
					<Link
						to={menu?.link}
						key={i}
						className={` ${
							menu?.margin && "mt-8 xl:mt-5"
						} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-400 rounded-md`}
						onClick={() => {
							menu?.onClick === "openReport" &&
								setOpenReport(!openReport);
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
								!openMenu &&
								"opacity-0 translate-x-300 overflow-hidden"
							}`}
						>
							{menu?.name}
						</h2>
						<h2
							className={`${
								openMenu && "hidden"
							} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
						>
							{menu?.name}
						</h2>
					</Link>
				))}
				{openReport &&
					reports?.map((menu, i) => (
						<Link
							to={menu?.link && menu?.link}
							key={i}
							className={` ${
								menu?.margin && "mt-20 xl:mt-5"
							} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-400 rounded-md`}
						>
							{/* <div
								title={menu?.title}
								className="sm:flex justify-end items-start"
							>
								{createElement(menu?.icon, {
									size: "20",
								})}
							</div> */}
							<h2
								style={{
									transitionDelay: `${i + 3}00ms`,
								}}
								className={`whitespace-pre duration-700 ${
									!openMenu &&
									"opacity-0 translate-x-300 overflow-hidden"
								}`}
							>
								{menu?.name}
							</h2>
							<h2
								className={`${
									openMenu && "hidden"
								} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
							>
								{menu?.name}
							</h2>
						</Link>
					))}
			</List>
			<Divider />
			<List>
				{settings.map((menu, i) => (
					<Link
						to={menu?.link}
						key={i}
						className={` ${
							menu?.margin && "mt-14 xl:mt-5"
						} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-400 rounded-md`}
						onClick={() => {
							menu?.onClick?.();
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
								!openMenu &&
								"opacity-0 translate-x-300 overflow-hidden"
							}`}
						>
							{menu?.name}
						</h2>
						<h2
							className={`${
								openMenu && "hidden"
							} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
						>
							{menu?.name}
						</h2>
					</Link>
				))}
			</List>
		</Box>
	);

	return (
		<div>
			{["right"].map((anchor) => (
				<Fragment key={anchor}>
					<IconButton onClick={toggleDrawer(anchor, true)}>
						<HiMenuAlt3
							size={26}
							style={{ margin: "10px" }}
							color="black"
						/>
					</IconButton>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{list(anchor)}
					</Drawer>
				</Fragment>
			))}
		</div>
	);
};
