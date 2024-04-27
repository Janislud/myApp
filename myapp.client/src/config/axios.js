import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://localhost:7176/api',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
});
