import apiInstance from "../..";
import ENDPOINTS from "../../endpoints";

export const login = async (
    payload: LoginEmailPayload | LoginUsernamePayload
): Promise<LoginResponse> => {
    const response = await apiInstance.post(ENDPOINTS.LOGIN, payload);
    return response.data.data;
};
