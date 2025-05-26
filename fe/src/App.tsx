import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

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
