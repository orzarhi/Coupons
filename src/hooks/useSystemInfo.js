import { useMutation, useQuery } from "react-query";
import { getSystemInfo, updateSystemInfo } from "~/api/systemInfo/systemInfo";
import { queryKeys } from "~/constants/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

export const useSystemInfo = () =>
	useQuery([queryKeys.systemInfo], getSystemInfo);

export const useUpdateSystemInfo = (setOpen, open, refetch) =>
	useMutation(updateSystemInfo, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
