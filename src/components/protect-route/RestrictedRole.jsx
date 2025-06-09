import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function RestrictedRole({ element, restrictedRole }) {
  const user = useSelector((store) => store.user);

  if (!user || !user.role) {
    return element;
  }

  if (restrictedRole.includes(user.role)) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/dashboard" replace />;
      case "SALE":
        return <Navigate to="/dashboardSale" replace />;
      case "MANAGER":
        return <Navigate to="/dashboardManager" replace />;
      case "CONSULTING":
        return <Navigate to="/consulting" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  // Otherwise, render the element

  return element;
}

RestrictedRole.propTypes = {
  element: PropTypes.element.isRequired,
  restrictedRole: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestrictedRole;
