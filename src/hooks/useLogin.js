import { decodeToken } from "react-jwt";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "~/api/login/login";
import { useAuthStore } from "~/store/auth";
import { error } from "~/utils/onError";
import { PersonType } from "~/constants/PersonType";
import { nameCookies } from "~/services/nameService";

export const useLogin = (employeeName) => {
	nameCookies.set(employeeName);
	const { loginStore } = useAuthStore();
	const navigate = useNavigate();

	return useMutation(login, {
		onSuccess: async (data) => {
			loginStore(data.data);
			const type = decodeToken(data.data)?.type;
			const isSysAdmin = decodeToken(data.data)?.isSysAdmin;

			if (type === PersonType.EMPLOYEE.label && isSysAdmin)
				document.location.href = "/employees";
			else if (type === PersonType.EMPLOYEE.label)
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
