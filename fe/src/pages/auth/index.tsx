import { useState } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signupForm";
import useAuthStore from "@/store/authstore";
import { Navigate } from "react-router";

const Auth = () => {
    const [view, setView] = useState<"LOGIN" | "SIGNUP">("LOGIN");
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to={"/"} replace />;
    }
    if (view === "LOGIN")
        return <LoginForm onViewChange={() => setView("SIGNUP")} />;
    return <SignUpForm onViewChange={() => setView("LOGIN")} />;
};

export default Auth;
