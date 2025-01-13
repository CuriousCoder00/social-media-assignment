import { AxiosError } from "axios";
import { axiosInstance } from "./axios.config";

export const getFriends = async () => {
    try {
        const response = await axiosInstance.get('/friend');
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}

export const addFriend = async (friendId: string) => {
    try {
        const response = await axiosInstance.post(`/friend/${friendId}`);
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}

export const removeFriend = async (friendId: string) => {
    try {
        const response = await axiosInstance.delete(`/friend/${friendId}`);
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}