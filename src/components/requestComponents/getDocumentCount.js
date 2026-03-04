import axios from "axios";
import { api } from "../../js/api";

const getDocumentCount = ({ model, setState, filterCundition = null }) => {
    axios.post(`${api}/getDocumentCount`,
        { model, filterCundition }).then(response => {
            setState(response.data.report)
        }).catch(error => { console.error(error) });
};
export default getDocumentCount;