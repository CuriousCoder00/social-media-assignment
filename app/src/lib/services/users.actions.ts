import { AxiosError } from "axios";
import { axiosInstance } from "./axios.config";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return { data: response.data, status: response.status };
    } catch (error) {
        return { data: (error as AxiosError).response?.data, status: (error as AxiosError).response?.status };
    }
}