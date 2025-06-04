import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TaskLoader = () => {
    return (
        <Card className="w-full md:w-[calc(50%-10px)]">
            <CardContent>
                <Skeleton className="h-8 w-[250px] mb-1" />
                <Skeleton className="h-4 w-[150px] mb-1" />
                <Skeleton className="h-4 w-[150px] mb-1" />
            </CardContent>
        </Card>
    );
};

export default TaskLoader;
