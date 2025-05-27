import Select from "@/components/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/utils/api/createTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    priority: z.enum(["low", "medium", "high"], {
        required_error: "Priority is required",
    }),
});

const PRIORITY_OPTIONS = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
];
const CreateTaskForm = ({ onSuccess: onTaskCreated }: CreateTaskFromProps) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
    });
    const { mutate: mutateAddTask, isPending } = useMutation({
        mutationFn: async (data: CreateTaskRequest) => {
            return createTask(data);
        },
        onSuccess: () => {
            toast.success("Task created successfully!");
            onTaskCreated();
        },
    });
    const submitHandler = (data: z.infer<typeof taskSchema>) => {
        const payload: CreateTaskRequest = {
            title: data.title,
            description: data.description,
            status: "pending",
            priority: data.priority,
            dueDate: new Date().toISOString(),
        };
        mutateAddTask(payload);
    };
    return (
        <>
            {isPending && <Loader />}
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-4">
                    <Input
                        {...register("title")}
                        type="text"
                        placeholder="Title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <Textarea
                        {...register("description")}
                        placeholder="Description"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={PRIORITY_OPTIONS}
                                placeholder="Select status"
                                value={field.value || ""}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.priority && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.priority.message}
                        </p>
                    )}
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="font-bold">
                        Create
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateTaskForm;
