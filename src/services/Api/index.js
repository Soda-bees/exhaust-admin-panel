import axios from "axios"
import apiInstance from "../ApiInstance"

// const baseURL = 'https://exhaust-backend.netlify.app/.netlify/functions/api/admin/'
const baseURL = 'http://localhost:9999/.netlify/functions/api/admin/'



export const signin = async (body) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    const { data } = await axios.post(`${baseURL}auth/signin`, body, { headers })
    return data
}

export const getAllProducts = async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.get(`${baseURL}getAllProducts`, { headers })
    return data
}