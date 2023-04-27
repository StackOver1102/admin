import axios from "axios"
import { API } from "../utils/apiUrl"



export const getPay = async (data) => {
    const res = await axios.get(`${API}/api/v1/pay`)
    return res.data
}