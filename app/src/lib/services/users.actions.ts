import { AxiosError } from "axios";
import { axiosInstance } from "./axios.config";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/user');
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}

export const getUserById = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/user/${userId}`);
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const response = await axiosInstance.get(`/user/username/${username}`);
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}