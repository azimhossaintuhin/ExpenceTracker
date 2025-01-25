import axios, { InternalAxiosRequestConfig } from "axios";
import { mmkv } from "../utils/MMKV";

const getToken = () => {
    const access = mmkv.getItem("access") ?? ""; // Ensure it doesn't return undefined
    const refresh = mmkv.getItem("refresh") ?? "";
    return { access, refresh };
};

const setToken = (access: string, refresh: string) => {
    mmkv.setItem("access", access);
    mmkv.setItem("refresh", refresh);
};

const removeToken = () => {
    mmkv.removeItem("access");
    mmkv.removeItem("refresh");
};

export const ApiInstance = axios.create({
    baseURL: "http://192.168.0.106:8000/api/v1/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
ApiInstance.interceptors.request.use(
    (config) => {
        const { access } = getToken();
        if (access) {
            config.headers["Authorization"] = `Bearer ${access}`;
        }
        return config; 
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor
ApiInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        const { refresh } = getToken();
        if (error.response?.status === 401 && refresh) {
            try {
                const response = await axios.post("http://192.168.0.106:8000/api/v1/token/refresh/", {
                    refresh,
                });
                setToken(response.data.access, response.data.refresh);
                originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
                console.log("Token Refreshed");
                return ApiInstance(originalRequest);
            } catch (error) {
                removeToken();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)