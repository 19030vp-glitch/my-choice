import { api } from "../../../js/api"
import axios from 'axios';
import { checkDataTableHead } from "./checkDataTableHeads";

const checkData = (filter, checkForCustomModel) => {
    const link = `${api}/validity/checkValidity`
    return axios.post(link, { tableHeads: checkDataTableHead, filter, checkForCustomModel })

};

export default checkData
