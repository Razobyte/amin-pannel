import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default AuthRoute;
