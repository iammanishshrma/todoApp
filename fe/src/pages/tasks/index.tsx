import CreateTaskModal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateTaskForm from "./createTaskForm";

const Tasks = () => {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
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
