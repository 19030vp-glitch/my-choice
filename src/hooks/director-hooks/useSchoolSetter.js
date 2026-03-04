import { useEffect } from "react";
import { useSelector } from 'react-redux';

const  useSchoolSetter = (values, setvalues) => {
    const directorUser = useSelector(state => state.user.directorUser)
    useEffect(() => {
        setvalues((pri) => {
          return {
            ...pri, School: directorUser?.department
          }
        })
    }, [values])
}
export default useSchoolSetter
