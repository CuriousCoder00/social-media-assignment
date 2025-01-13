import { AxiosError } from "axios";
import { axiosInstance } from "./axios.config";

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('social_media_app_token', token);
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/register', { name, email, password });
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.post('/auth/logout');
        localStorage.removeItem("social_media_app_session");
        localStorage.removeItem("social_media_app_token");
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}