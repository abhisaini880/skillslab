import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { login, clearError } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

interface LoginForm {
    username: string;
    password: string;
}

const LoginPage = () => {
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Log initial component state and navigation intent
    useEffect(() => {
        console.log('LoginPage mounted, redirect path:', from);
        console.log('Initial auth state:', { isLoading, error });

        return () => {
            console.log('LoginPage unmounting');
        };
    }, []);

    // Log when auth state changes
    useEffect(() => {
        console.log('Auth state changed:', { isLoading, error });
    }, [isLoading, error]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        console.log('Login attempt with username:', data.username);
        try {
            const resultAction = await dispatch(login(data));
            console.log('Login action result:', resultAction);

            if (login.fulfilled.match(resultAction)) {
                console.log('Login successful, navigating to:', from);
                await dispatch(clearError());
                navigate(from, { replace: true });
            } else if (login.rejected.match(resultAction)) {
                console.error('Login failed:', resultAction.error);
            }
        } catch (err) {
            console.error('Exception during login process:', err);
        }
    };

    // Log form validation errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.log('Form validation errors:', errors);
        }
    }, [errors]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Log In to SkillsLab
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{
                                required: 'Username is required',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                            onClick={() => console.log('Login button clicked')}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Log In'}
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Don't have an account? Sign up
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage;
