import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '@/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getCurrentUser } from '@/store/slices/authSlice';
import { CircularProgress, Box } from '@mui/material';

interface RequireAuthProps {
    requireAdmin?: boolean;
}

const RequireAuth = ({ requireAdmin = false }: RequireAuthProps) => {
    const { isAuthenticated, isLoading, token, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (token && !isLoading) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, token]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check for admin permission if the route requires it
    if (requireAdmin && (!user || !user.is_admin)) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireAuth;
