import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element: Component, requiredRole, ...rest }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <div>Acces interzis. Această pagină este accesibilă doar pentru admini.</div>;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
