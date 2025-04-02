import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const PublicRoute = ({ element }) => {
    const { authState } = useAuth();
    return authState.authenticated ? <Navigate to="/" /> : element;
};

export default PublicRoute;