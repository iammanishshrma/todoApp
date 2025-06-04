import CreateTaskModal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/utils/api/getTasks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CreateTaskForm from "./createTaskForm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const Tasks = () => {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const { data: taskRes, isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
        refetchOnWindowFocus: false,
    });
    const tasks = taskRes?.tasks || [];
    return (
        <>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <Button
                    type="button"
                    onClick={() => {
                        setShowCreateTaskModal(true);
                    }}
                >
                    Create Task
                </Button>
            </div>
            <div className="">
                {tasks.length === 0 && !isLoading ? (
                    <p className="text-gray-500 text-center mt-20">
                        No tasks available. Click "Create Task" to add a new
                        task.
                    </p>
                ) : (
                    <div className="flex justify-between flex-wrap gap-4">
                        {tasks.map((task) => (
                            <Card
                                key={task._id}
                                className="w-full md:w-[calc(50%-10px)]"
                            >
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
                        ))}
                    </div>
                )}
            </div>
            <CreateTaskModal
                isOpen={showCreateTaskModal}
                setIsOpen={setShowCreateTaskModal}
            >
                <h1 className="text-xl font-bold">Create Task</h1>
                <CreateTaskForm
                    onSuccess={() => setShowCreateTaskModal(false)}
                />
            </CreateTaskModal>
        </>
    );
};
export default Tasks;
