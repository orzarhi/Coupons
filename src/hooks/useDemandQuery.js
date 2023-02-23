import { useState } from "react";
import { useMutation } from "react-query";

export const useDemandQuery = (queryFn) => {
	const [data, setData] = useState(undefined);
	const { mutate, isLoading, isSuccess, isError } = useMutation(queryFn, {
		onSuccess: (data) => setData(data),
		onMutate: () => setData(undefined),
	});
	return [data, mutate, { isLoading, isSuccess, isError }];
};
