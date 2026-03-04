import axios from "axios";
import { api } from "../../js/api";

const getDepartmentWiseDocumentCount = ({ model, setState, property }) => {
    axios.post(`${api}/getDepartmentWiseDocumentCount`,
        { model, property }).then(response => {
            setState(response.data)
        }).catch(error => { console.error(error) });
};
export default getDepartmentWiseDocumentCount;