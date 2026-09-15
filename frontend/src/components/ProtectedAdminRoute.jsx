import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
    const token = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser");

    if (!token || !storedUser) {
        return <Navigate to="/admin/login" replace />;
    }

    try {
        const user = JSON.parse(storedUser);

        if (user.role !== "admin") {
            return (
                <Navigate
                    to="/admin/login"
                    replace
                />
            );
        }

        return children;
    } catch {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }
}

export default ProtectedAdminRoute;