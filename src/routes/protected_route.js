import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (props) => {
  // const profile = JSON.parse(getCookie("profile"));
  const  auth  = useSelector((state) => state.auth);
  let location = useLocation();
  // console.log(auth);
  if (auth.isLoggedIn !== true) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return props.children;
};

export default ProtectedRoute;
