import apiInstance from "../..";
import ENDPOINTS from "../../endpoints";

export const logoutUser = async (): Promise<string> => {
    const response = await apiInstance.post(ENDPOINTS.LOGOUT);
    return response.data.message || "Logged out successfully";
};
