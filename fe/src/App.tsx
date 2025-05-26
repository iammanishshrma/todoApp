import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import router from "./routes";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";

const queryClient = new QueryClient();

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
            <ToastContainer />
        </Suspense>
    );
};

export default App;
