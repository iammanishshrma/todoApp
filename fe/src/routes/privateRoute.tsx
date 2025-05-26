import useAuthStore from "@/store/authstore";
import { Navigate } from "react-router";

function PrivateRoute(props: PrivateRouteProps) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={"/auth"} />;
    }

    return props.children;
}

export default PrivateRoute;
