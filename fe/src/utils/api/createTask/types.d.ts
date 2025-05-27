type CreateTaskRequest = {
    title: string;
    description: string;
    status: "pending" | "completed" | "in-progress";
    priority: "low" | "medium" | "high";
    dueDate: string; // ISO date string
};

type CreateTaskResponse = {
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
