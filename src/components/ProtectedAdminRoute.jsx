import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

const ProtectedAdminRoute = () => {
    const { user } = useAuth();

    // Kiểm tra nếu user đã đăng nhập và có role là admin
    if (!user) {
        // Chưa đăng nhập, chuyển hướng đến trang login
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        // Không phải admin, chuyển hướng đến trang chủ
        return <Navigate to="/" replace />;
    }

    // Là admin, cho phép truy cập
    return <Outlet />;
};

export default ProtectedAdminRoute;