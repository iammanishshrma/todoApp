import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { signup } from "@/utils/api/auth/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        username: z.string().min(1, "Username is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const SignUpForm = ({ onViewChange }: SignUpFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
    });

    const { mutate: mutateSignup } = useMutation({
        mutationFn: async (data: z.infer<typeof userSchema>) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword: _, ...payload } = data;
            return signup(payload);
        },
        onSuccess: (data) => {
            toast.success("Signup successful! Please login.");
            onViewChange("LOGIN");
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        },
    });
    const submitHandler = (data: z.infer<typeof userSchema>) => {
        console.log("Submitting signup data:", data);
        mutateSignup(data);
    };
    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Signup
                    </CardTitle>
                    <CardDescription className="text-center text-sm">
                        Create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-4">
                            <Input
                                {...register("firstName")}
                                type="text"
                                placeholder="First Name"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Input
                                {...register("lastName")}
                                type="text"
                                placeholder="Last Name"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Input
                                {...register("username")}
                                type="text"
                                placeholder="Username"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8">
                            <Input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <Button className="w-full font-bold" type="submit">
                            Signup
                        </Button>
                        <p className="text-sm text-center mt-2">
                            Already have an account,&nbsp;
                            <Button
                                variant={"link"}
                                type="button"
                                onClick={() => {
                                    onViewChange("LOGIN");
                                }}
                                className="p-0"
                            >
                                login
                            </Button>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpForm;
