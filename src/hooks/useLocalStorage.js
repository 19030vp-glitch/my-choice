import { useEffect } from "react"

const useLocalStorage = ({ titleOfStorage, formData, setFormData, shouldUpdate, setShouldUpdate, initialState, dependancies }) => {
    useEffect(() => {
        shouldUpdate && localStorage.setItem(titleOfStorage, JSON.stringify(formData))
    }, [formData])

    useEffect(() => {
        setFormData(JSON.parse(localStorage.getItem(titleOfStorage)) ? JSON.parse(localStorage.getItem(titleOfStorage)) : initialState)
        setShouldUpdate(true)
    }, dependancies)
}

export default useLocalStorage