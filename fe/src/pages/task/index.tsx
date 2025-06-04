import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Task = () => {
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
