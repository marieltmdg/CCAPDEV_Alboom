import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ element }) => {
    const { authState } = useAuth();
    return authState.authenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;