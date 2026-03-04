import axios from "axios";
import toast from "react-hot-toast";

const excelReq = (valuesNC, path, initialstate, values, setState, refetch, setOpen, setLoading, user) => {


  let formData = new FormData();
  Object.keys(values).map((key) => {
    formData.append(key, values[key]);
  });
  Object.keys(valuesNC).map((key) => {
    formData.append(key, valuesNC[key]);
  })

  const link = `${api}/${user}/excelRecord/${path}`

  axios
    .post(link, formData)
    .then((res) => {
      const status = res.status;
      if (!status) {
        toast.error("Entry Failed!");
      } else if (status === 201) {
        toast.success(res.data);
        refetch();
        setState(initialstate);
        setOpen(false);
        setLoading(false);
      } else if (status === 500) {
        toast.error(res.data);
        setLoading(false);
        refetch();
      } else {
        toast.error("Something wrong");
      }
    })
    .catch((error) => {
      toast.error(`Edited Hedings of Sample File or Passing empty fild to required value`);
      setLoading(false);
      setOpen(false);
      refetch();
    });
};
export default excelReq;