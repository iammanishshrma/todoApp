import apiInstance from "..";
import ENDPOINTS from "../endpoints";

export const getTask = async (taskId: string): Promise<GetTasksResponse> => {
    const response = await apiInstance.get(`${ENDPOINTS.GET_TASKS}/${taskId}`);
    return response.data.data;
};
