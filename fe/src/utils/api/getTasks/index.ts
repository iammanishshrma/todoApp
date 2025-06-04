import apiInstance from "..";
import ENDPOINTS from "../endpoints";

export const getTasks = async (): Promise<GetTasksResponse> => {
    const response = await apiInstance.get(ENDPOINTS.GET_TASKS);
    return response.data.data;
};
