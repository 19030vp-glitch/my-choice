import { useEffect } from "react";
import GetReq from "../../services/director/components/render/GetReq";
import { useSelector } from 'react-redux';

const useGet = (SendReq, setTableBody) => {
    const directorUser = useSelector(state => state.user.directorUser)
    const gcallback = (a,b,c) => {
        GetReq(a,b,c)
    }
    useEffect(() => {
        gcallback(directorUser?.department, SendReq, setTableBody);
    }, []);
}
export default useGet;