import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/slices/authSlice';

/**
 * Runs getCurrentUser on mount so auth state is available.
 * Always renders children so the app (and landing page) show immediately—
 * no full-screen spinner that blocks the landing page.
 */
const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCurrentUser());
    }
  }, [dispatch, status]);

  return children;
};

export default AuthLoader;
