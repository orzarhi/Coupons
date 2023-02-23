import { Avatar } from "@mui/material";
import avatar from "~/assets/images/avatar/user.png";
import { nameCookies } from "~/services/nameService";
import { useAuthStore } from "~/store/auth";

const Header = () => {
	const { name } = useAuthStore();

	return (
		<header className="h-20 pl-9 text-3xl flex flex-row-reverse items-center justify-between bg-blue-50  mb-8 ltr:ml-3">
			{/* <Avatar
					sx={{ width: 60, height: 60 }}
					alt="user"
					src={avatar}
				/> */}
			<div className="flex justify-center m-3 text-xl text-gray-900 h-7 font-semibold sm:w-8/12 sm:text-sm">
				ברוכים הבאים - {name}
			</div>
			{/* <nav>
					<ul className="flex">
						<li className="pr-80"> ברוכים הבאים - אור זרחי</li>
					</ul>
				</nav> */}
		</header>
	);
};
export default Header;
