import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URI!;

const apiInstance = axios.create({
    baseURL,
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default apiInstance;
