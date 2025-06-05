import CreateTaskModal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateTaskForm from "./createTaskForm";
import TaskList from "./list";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/utils/api/getTasks";
import PageHeader from "@/components/pageHeader";

const Tasks = () => {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    const {
        data: taskRes,
        isLoading,
        refetch: refetchTasks,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
        refetchOnWindowFocus: false,
    });
    const tasks = taskRes?.tasks || [];
    return (
        <>
            <PageHeader
                title="Tasks"
                ctaButton={
                    <Button
                        type="button"
                        onClick={() => {
                            setShowCreateTaskModal(true);
                        }}
                    >
                        Create Task
                    </Button>
                }
            />
            <TaskList tasks={tasks} isLoading={isLoading} />
            <CreateTaskModal
                isOpen={showCreateTaskModal}
                setIsOpen={setShowCreateTaskModal}
            >
                <h1 className="text-xl font-bold">Create Task</h1>
                <CreateTaskForm
                    onSuccess={() => {
                        setShowCreateTaskModal(false);
                        refetchTasks();
                    }}
                />
            </CreateTaskModal>
        </>
    );
};
export default Tasks;
