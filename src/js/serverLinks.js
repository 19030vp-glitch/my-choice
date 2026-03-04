import { api } from "./api"

const baseURL = api

const serverLinks = {
    showFile: (photoURL, userType) => {
        let fullUrl = `${baseURL}/showFile/${photoURL}/${userType}`
        return (fullUrl)
    }
}

export default serverLinks