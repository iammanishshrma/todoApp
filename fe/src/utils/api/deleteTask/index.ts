import apiInstance from "..";
import ENDPOINTS from "../endpoints";

export const deleteTask = async (taskId: string): Promise<null> => {
    const response = await apiInstance.delete(
        `${ENDPOINTS.DELETE_TASK}/${taskId}`
    );
    return response.data.data;
};
