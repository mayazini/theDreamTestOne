import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../pages/UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, setUser } = useContext(UserContext);
  let userRole = 'guest'; // default role

  if (user !== null) {
    userRole = user.isAdmin ? 'admin' : 'loggedIn';
  }

  const navigate = useNavigate();

  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    setTimeout(() => {
      navigate('/');
    }, 10);
    return null;
  }
};

export default ProtectedRoute;
