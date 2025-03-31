import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token, isAuthLoaded } = useAuthContext();

  if (!isAuthLoaded){
    return <div>Loading..</div>
  }

  if (token === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
