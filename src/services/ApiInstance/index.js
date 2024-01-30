import axios from 'axios';
const baseURL = "https://exhaust-backend.netlify.app/.netlify/functions/api/"

const apiInstance = axios.create({
    baseURL,
    withCredentials: true,   
});


export default apiInstance;