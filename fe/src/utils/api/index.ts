import useAuthStore from "@/store/authstore";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URI!;

const apiInstance = axios.create({
    baseURL,
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

apiInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiInstance;
