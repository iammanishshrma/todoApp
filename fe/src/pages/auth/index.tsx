import { useState } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signupForm";

const Auth = () => {
    const [view, setView] = useState<"LOGIN" | "SIGNUP">("LOGIN");

    if (view === "LOGIN")
        return <LoginForm onViewChange={() => setView("SIGNUP")} />;
    return <SignUpForm onViewChange={() => setView("LOGIN")} />;
};

export default Auth;
