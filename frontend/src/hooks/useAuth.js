import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.auth);

  const isAuthenticated = !!user;
  const role = user?.role || null;
  const isLoading = status === 'loading';

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const hasRole = (allowedRoles) => {
    if (!user) return false;
    if (!allowedRoles) return true;
    return allowedRoles.includes(user.role);
  };

  return {
    user,
    role,
    isAuthenticated,
    isLoading,
    error,
    logout: handleLogout,
    hasRole
  };
};