import { useQuery } from "react-query";
import getReq from "../components/requestComponents/getReq";

const useFetchData = (
  model,
  module,
  filter,
  enabled,
  setData,
  refetchOnWindowFocus = true
) => {
  const params = { model, module, filter, id: "" };
  const { data, isLoading, refetch, error, isError, isFetching } = useQuery(
    `${model}, ${JSON.stringify(params)}`,
    () => getReq(params),
    { enabled, refetchOnWindowFocus }
  );
  return { data, isLoading, refetch, error, isError, isFetching };
};

export default useFetchData;
