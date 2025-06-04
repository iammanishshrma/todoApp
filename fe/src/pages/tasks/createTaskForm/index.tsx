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
import moment from "moment";

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    priority: z.enum(["low", "medium", "high"], {
        required_error: "Priority is required",
    }),
    dueDate: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (!val) return true; // optional
                const selectedDate = moment(val, moment.ISO_8601, true);
                const today = moment().startOf("day");
                return (
                    selectedDate.isValid() && selectedDate.isSameOrAfter(today)
                );
            },
            {
                message: "Due date must be today or in the future",
            }
        ),
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
        const sevenDaysLater = moment()
            .startOf("day")
            .add(7, "days")
            .toISOString();

        const payload: CreateTaskRequest = {
            title: data.title,
            description: data.description,
            status: "pending",
            priority: data.priority,
            dueDate: data.dueDate || sevenDaysLater,
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
                <div className="md:flex justify-between gap-4 mb-4">
                    <div className="md:w-[calc(50%-10px)] mb-4 md:mb-0">
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={PRIORITY_OPTIONS}
                                    placeholder="Select Priority"
                                    className="w-full"
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
                    <div className="md:w-[calc(50%-10px)]">
                        <Input
                            {...register("dueDate")}
                            type="date"
                            className="block"
                            placeholder="Expiration Date"
                        />
                        {errors.dueDate && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.dueDate.message}
                            </p>
                        )}
                    </div>
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
