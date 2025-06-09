import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function RequiredRole({ element, requiredRole }) {
  const user = useSelector((store) => store.user);

  if (!user) {
    toast.error("Access deny");
    return <Navigate to="/" replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; // Chuyển hướng tới trang không có quyền
  }

  return element;
}

export default RequiredRole;
