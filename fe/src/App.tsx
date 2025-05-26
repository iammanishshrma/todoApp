import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import router from "./routes";

const queryClient = new QueryClient();

const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
            <ToastContainer />
        </>
    );
};

export default App;
