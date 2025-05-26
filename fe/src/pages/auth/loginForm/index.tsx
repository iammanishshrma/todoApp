import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/utils/api/auth/login";
import { errorToast } from "@/utils/toasts";
import useAuthStore from "@/store/authstore";
import Loader from "@/components/ui/loader";

const loginSchema = z.object({
    userId: z.string().min(1, "Username/Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = ({ onViewChange }: LoginFormProps) => {
    const setUserData = useAuthStore((state) => state.setUserData);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });
    const { mutate: loginMutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof loginSchema>) => {
            const isUsername = !data.userId.includes("@");
            const payload = isUsername
                ? { username: data.userId, password: data.password }
                : { email: data.userId, password: data.password };
            return login(payload);
        },
        onSuccess: (data) => {
            setUserData(data);
        },
        onError: (error: any) => {
            console.log("Login failed:", error.response.data.message);
            errorToast(error.response.data.message);
        },
    });
    const submitHandler = (data: z.infer<typeof loginSchema>) => {
        loginMutate(data);
    };
    return (
        <>
            {isPending && <Loader />}
            <div className="container mx-auto flex items-center justify-center h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Login
                        </CardTitle>
                        <CardDescription className="text-center text-sm">
                            Login to access the task list
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-4">
                                <Input
                                    {...register("userId")}
                                    type="text"
                                    placeholder="Username or Email"
                                />
                                {errors.userId && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.userId.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-8">
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
                            <Button className="w-full font-bold" type="submit">
                                Login
                            </Button>
                            <p className="text-sm text-center mt-2">
                                Do not have an account,&nbsp;
                                <Button
                                    variant={"link"}
                                    type="button"
                                    onClick={() => {
                                        onViewChange("SIGNUP");
                                    }}
                                    className="p-0"
                                >
                                    register
                                </Button>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default LoginForm;
