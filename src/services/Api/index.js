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

export const deleteProduct = async (_id, token) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}deleteProduct`, { _id }, { headers })
    return data
}

export const uploadBrandLogo = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}uploadBrandLogo`, formData, { headers })
    return data
}

export const uploadSound = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}uplaodSound`, formData, { headers })
    return data
}

export const uploadProductsImages = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}uploadProductsImages`, formData, { headers })
    return data
}

export const addProduct = async (token, body) => {
    console.log(body);
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}addProduct`, body, { headers })
    return data
}