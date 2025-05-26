import apiInstance from "../..";
import ENDPOINTS from "../../endpoints";

export const login = async (email: string, password: string) => {
    const response = await apiInstance.post(ENDPOINTS.LOGIN, {
        email,
        password,
    });
    return response.data;
};
