import apiInstance from "..";
import ENDPOINTS from "../endpoints";

export const createTask = async (
    payload: CreateTaskRequest
): Promise<CreateTaskResponse> => {
    const response = await apiInstance.post(ENDPOINTS.CREATE_TASK, payload);
    return response.data.data;
};
