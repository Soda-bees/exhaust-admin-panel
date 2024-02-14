import axios from "axios"

//export const baseURL = 'https://exhaust-backend.netlify.app/.netlify/functions/api/admin/'
// export const baseURL = 'http://localhost:9999/.netlify/functions/api/admin/'
export const baseURL = 'http://192.168.100.59:5000/'



export const signin = async (body) => {
    const headers = {
        'Content-Type': 'application/json',
    }
    const { data } = await axios.post(`${baseURL}admin/auth/signin`, body, { headers })
    return data
}

export const getAllProducts = async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.get(`${baseURL}admin/getAllProducts`, { headers })
    return data
}

export const deleteProduct = async (_id, token) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/deleteProduct`, { _id }, { headers })
    return data
}

export const uploadBrandLogo = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/uploadBrandLogo`, formData, { headers })
    return data
}

export const uploadSound = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/uplaodSound`, formData, { headers })
    return data
}

export const uploadProductsImages = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/uploadProductsImages`, formData, { headers })
    return data
}

export const addProduct = async (token, body) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/addProduct`, body, { headers })
    return data
}

export const updateProduct = async (token, body) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/updateProduct`, body, { headers })
    return data
}

export const getAllOrders = async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.get(`${baseURL}admin/allOrders`, { headers })
    return data
}

export const updateOrderStatus = async (token, body) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/updateOrderStatus`, body, { headers })
    return data
}

export const forgotPassword = async (email) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const { data } = await axios.post(`${baseURL}admin/fotgotPassword`, { email }, { headers })
    return data
}

export const resetPassword = async (body) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const { data } = await axios.post(`${baseURL}admin/resetPassword`, body, { headers })
    return data
}

export const uploadProfile = async (formData, token) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/uploadProfile`, formData, { headers })
    return data
}

export const updateProfile = async (token, body) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/updateProfile`, body, { headers })
    return data
}

export const changePassword = async (token , body) => {
    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    }
    const { data } = await axios.post(`${baseURL}admin/changePassword`, body, { headers })
    return data
}