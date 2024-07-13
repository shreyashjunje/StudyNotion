// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token !== null) {
    return <Navigate to="/dashboard/my-profile" />;
  } else {
    return children;

  }
}

export default PrivateRoute;
