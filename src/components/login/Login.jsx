import { LoadingButton } from "@mui/lab";
import {
	Checkbox,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import picture from "~/assets/images/picture-login/man_login.png";
import maxsoftIcon from "~/assets/images/picture-login/maxsoft.png";
import { useLogin } from "~/hooks/useLogin";
import { useEmployeeByUsername } from "~/hooks/useTransactions";
import { useAuthStore } from "~/store/auth";
import * as toastMessages from "~/utils/notification/index";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [iAgree, setIAgree] = useState(true);

	const usernameInputRef = useRef();
	const passwordInputRef = useRef();

	const { data: dataEmployee } = useEmployeeByUsername(
		usernameInputRef?.current?.value
	);

	const { mutate: login } = useLogin(dataEmployee?.employeeName);

	const handleClick = (e) => {
		e.preventDefault();

		const username = usernameInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;

		try {
			if (!username || !password)
				toastMessages.infoMessage("נא למלא את כל השדות.");
			else {
				if (!iAgree) {
					toastMessages.infoMessage("נא לאשר תנאי שימוש.");
				} else {
					const user = { username, password };
					login(user);
				}
			}
		} catch {
			toastMessages.errorMessage("שגיאה: בעיית התחברות לשרת.");
		}
	};

	return (
		<>
			{/* <Typography
				variant="h3"
				sx={{ px: 5, mt: 2, mb: 5 }}
				className="title-login"
			>
				ברוכים הבאים 👋
			</Typography> */}
			{/* <img
				src={picture}
				alt="login"
				className="block ml-auto mr-auto w-28 rounded-lg p-4"
			/> */}
			<img
				src={maxsoftIcon}
				alt="maxsoft-icon"
				className="w-80 block ml-auto mr-auto rounded-lg p-4 mb-5 mt-20"
			/>
			<Stack
				spacing={3}
				className="w-1/5 block ml-auto mr-auto xl:w-2/5 sm:w-11/12"
			>
				<TextField
					name="id"
					label="שם משתמש"
					inputRef={usernameInputRef}
					required
				/>
				<TextField
					name="password"
					label="סיסמא"
					type={showPassword ? "text" : "password"}
					inputRef={passwordInputRef}
					required
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() =>
										setShowPassword(!showPassword)
									}
									edge="end"
								>
									{showPassword ? (
										<AiFillEye />
									) : (
										<AiFillEyeInvisible />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Stack
					direction="row"
					alignItems="center"
					// justifyContent="space-between"
					// flexDirection="row-reverse"
					sx={{ my: 2 }}
				>
					<Checkbox
						name="iAgree"
						checked={iAgree}
						onClick={() => setIAgree(!iAgree)}
					/>
					אני מאשר/ת תנאי שימוש.
				</Stack>
			</Stack>

			<div className="flex flex-col items-center w-full text-base mt-2">
				<LoadingButton
					size="large"
					type="submit"
					variant="contained"
					onClick={handleClick}
					className="!w-1/5 xl:!w-2/5 sm:!w-11/12 "
				>
					התחבר
				</LoadingButton>
			</div>
		</>
	);
};

export default Login;
