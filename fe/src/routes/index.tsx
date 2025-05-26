import { createBrowserRouter } from "react-router";
import Auth from "@/pages/auth";
import PrivateRoute from "./privateRoute";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/",
        element: (
            <PrivateRoute>
                <div>Home</div>
            </PrivateRoute>
        ),
    },
]);
export default router;
