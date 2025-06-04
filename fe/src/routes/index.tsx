import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const Auth = lazy(() => import("@/pages/auth"));
const PrivateRoute = lazy(() => import("@/routes/privateRoute"));
const MainLayout = lazy(() => import("@/layout/main"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const PageNotFound = lazy(() => import("@/pages/pageNotFound"));
const Tasks = lazy(() => import("@/pages/tasks"));
const Task = lazy(() => import("@/pages/task"));

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/",
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/tasks",
                children: [
                    {
                        path: "",
                        element: <Tasks />,
                    },
                    {
                        path: ":taskId",
                        element: <Task />,
                    },
                ],
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);
export default router;
