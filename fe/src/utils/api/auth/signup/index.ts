import apiInstance from "../..";
import ENDPOINTS from "../../endpoints";

export const signup = async (
    payload: SignupPayload
): Promise<SignupResponse> => {
    const response = await apiInstance.post(ENDPOINTS.SIGNUP, payload);
    return response.data.data;
};
