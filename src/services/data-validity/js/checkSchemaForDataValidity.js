import axios from 'axios';
import { api } from '../../../js/api';

const checkSchemaForDataValidity = (filter) => {
    const link = `${api}/validity/checkSchemaForDataValdity`
    return axios.post(link, { filter })
}


export default checkSchemaForDataValidity


