import axios from "axios";
import { api } from "../../js/api";

const getReq = ({ model, id, module, filter = null, filterConditios = null }) => {
  return axios.post(`${api}/${module}/getData`,
    { model, id, filter, filterConditios })
}
export default getReq;