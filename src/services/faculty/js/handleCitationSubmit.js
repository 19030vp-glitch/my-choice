import axios from "axios";
import { api } from "../../../js/api";
import toast from "react-hot-toast";

export const submitCitation = async (data, year, userId) => {
  const link = `${api}/api/add/publicationCitation`;

  const res = await axios.post(link, { data, year, userId });

  if (res.data.status === "added") {
    toast.success("Publication Citations added successfully");
  } else {
    toast.error("Error while updating Publication Citations");
  }
};
