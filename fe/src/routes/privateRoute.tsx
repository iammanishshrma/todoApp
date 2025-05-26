import { Navigate } from "react-router";

function PrivateRoute(props: PrivateRouteProps) {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return props.children;
}

export default PrivateRoute;
