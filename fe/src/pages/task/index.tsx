import ConfirmBox from "@/components/confirmBox";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { deleteTask } from "@/utils/api/deleteTask";
import { getTask } from "@/utils/api/getTask";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/pageHeader";

const Task = () => {
    const taskId = useParams<{ taskId: string }>().taskId ?? "";
    const queryClient = useQueryClient();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const navigate = useNavigate();
    const { data: task, isLoading } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTask(taskId),
        enabled: taskId.length > 0,
    });
    const { mutate: mutateDeleteTask, isPending } = useMutation({
        mutationFn: async (taskId: string) => deleteTask(taskId),
        onSuccess: () => {
            toast.success("Task deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate("/tasks");
        },
    });
    if (!task && !isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Task not found</h1>
            </div>
        );
    }
    return (
        <>
            <PageHeader title="Task Details" showBackButton />
            {isPending && <Loader />}
            {isLoading ? (
                <Loader />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>{task?.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{task?.description}</p>
                        <p className="text-sm text-gray-500">
                            Created at:&nbsp;
                            {moment(task?.createdAt ?? "").toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            Updated at:&nbsp;
                            {moment(task?.updatedAt ?? "").toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            Status: {task?.status}
                        </p>
                        <p className="text-sm text-gray-500">
                            Priority: {task?.priority}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button
                            variant="destructive"
                            onClick={() => setIsConfirmOpen(true)}
                        >
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            )}
            <ConfirmBox
                title="Delete Task"
                description="Are you sure you want to delete this task? This action cannot be undone."
                buttonTitle="Delete"
                isOpen={isConfirmOpen}
                setIsOpen={setIsConfirmOpen}
                onConfirm={() => mutateDeleteTask(taskId)}
            />
        </>
    );
};

export default Task;
