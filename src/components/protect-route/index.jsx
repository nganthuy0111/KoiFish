import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ProtectedRoute({ element, restrictedRole }) {
  const user = useSelector((store) => store.user);

  if (restrictedRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // Chuyển hướng tới trang không có quyền
  }

  return element;
}
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  restrictedRole: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
