import axios from 'axios';

export const API_URL = `http://localhost:5000/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((req) => {
    if(localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return req;
});

export default $api;

