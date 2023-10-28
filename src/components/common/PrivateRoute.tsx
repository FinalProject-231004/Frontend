import { Navigate, useNavigate } from 'react-router-dom';
import { useUserLoggedIn } from '@/hooks'
import { useEffect } from 'react';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useUserLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('isAuthenticated', isAuthenticated)
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
