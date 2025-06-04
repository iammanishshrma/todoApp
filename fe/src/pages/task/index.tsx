import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTask } from "@/utils/api/getTask";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const Task = () => {
    const taskId = useParams<{ taskId: string }>().taskId ?? "";
    useQuery({
        queryKey: ["task"],
        queryFn: () => getTask(taskId),
        enabled: taskId.length > 0,
    });
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Task</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Description</p>
                </CardContent>
            </Card>
        </>
    );
};

export default Task;
