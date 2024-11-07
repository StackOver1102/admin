import axios from "axios"
import { API } from "../utils/apiUrl"


export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${API}/users/loginadmin`, data)
        return res.data
    } catch (error) {
        throw error;
    }
}

export const getDetailsUser = async ( access_token) => {
    const res = await axios.get(`${API}/users/detail`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    },)
    return res.data

}
export const logoutUser = async () => {
    const res = await axios.post(`${API}/api/v1/users/logout`)
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token")
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`${API}/api/v1/users/register`, data)
    return res.data
}