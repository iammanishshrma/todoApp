const ENDPOINTS = {
    LOGIN: "/users/login",
    LOGOUT: "/users/logout",
    SIGNUP: "/users/register",
    CREATE_TASK: "/tasks",
    GET_TASKS: "/tasks",
    GET_TASK: "/tasks", //Add taskId to this endpoint when making a request like `/tasks/:taskId`
};
export default ENDPOINTS;
