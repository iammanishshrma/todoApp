type Task = {
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
type GetTasksResponse = {
    totalTodos: number;
    currentPage: number;
    totalPages: number;
    tasks: Task[];
};
