import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import TaskLoader from "./loader";

const getBadgeVariant = (status: "completed" | "in-progress" | "pending") => {
    switch (status) {
        case "completed":
            return "secondary";
        case "in-progress":
            return "destructive";
        case "pending":
            return "default";
        default:
            return "default";
    }
};

const TaskList = ({ tasks, isLoading }: TaskListProps) => {
    if (isLoading) {
        return (
            <div className="flex justify-between flex-wrap gap-4">
                <TaskLoader />
                <TaskLoader />
            </div>
        );
    }
    return (
        <>
            {tasks.length === 0 && !isLoading ? (
                <p className="text-gray-500 text-center mt-20">
                    No tasks available. Click "Create Task" to add a new task.
                </p>
            ) : (
                <div className="flex justify-between flex-wrap gap-4">
                    {tasks.map((task) => (
                        <Link
                            to={`/tasks/${task._id}`}
                            key={task._id}
                            className="w-full md:w-[calc(50%-10px)]"
                        >
                            <Card>
                                <CardContent>
                                    <div className="relative">
                                        <Badge
                                            variant={getBadgeVariant(
                                                task.status
                                            )}
                                            className="absolute top-2 right-2 capitalize"
                                        >
                                            {task.status}
                                        </Badge>
                                        <h2 className="text-xl font-semibold">
                                            {task.title}
                                        </h2>
                                        <p className="text-gray-600">
                                            {task.description}
                                        </p>
                                        <p className="text-gray-500">
                                            Priority: {task.priority} | Due:{" "}
                                            {new Date(
                                                task.dueDate
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            Created at:{" "}
                                            {new Date(
                                                task.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default TaskList;
