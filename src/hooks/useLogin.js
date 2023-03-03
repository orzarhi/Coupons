import { decodeToken } from "react-jwt";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "~/api/login/login";
import { PersonType } from "~/constants/PersonType";
import { login as loginService } from "~/services/authService";
import { error } from "~/utils/onError";

export const useLogin = (employeeName) => {
	// nameCookies.set(employeeName);
	// const { loginStore } = useAuthStore();
	const navigate = useNavigate();

	return useMutation(login, {
		onSuccess: async (data) => {
			// loginStore(data.data);
			loginService(data, employeeName);
			const type = decodeToken(data)?.type;

			if (type === PersonType.EMPLOYEE.label)
				document.location.href = "/employees";
			else if (type === PersonType.SUPPLIER.label)
				document.location.href = "/suppliers";
			else navigate("/");
		},
		onError: (data) => {
			error(data);
		},
	});
};
