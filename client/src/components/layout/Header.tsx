import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Button,
    Avatar,
    Tooltip,
    Container,
    Badge,
    InputBase,
    alpha,
    Divider,
    ListItemIcon,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleCloseUserMenu();
        navigate('/');
    };

    const handleProfile = () => {
        navigate('/profile');
        handleCloseUserMenu();
    };

    const handleAdmin = () => {
        navigate('/admin');
        handleCloseUserMenu();
    };

    // Check if user is admin - in a real app, this would be based on actual user role
    const isAdmin = user?.is_admin || user?.email === 'admin@example.com';

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: 'blur(10px)',
                background: 'rgba(10, 10, 27, 0.8)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 70 }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                        onClick={toggleSidebar}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo & Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RocketLaunchIcon
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                mr: 1.5,
                                fontSize: '28px',
                                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                                textDecoration: 'none',
                                letterSpacing: '0.05em',
                            }}
                        >
                            SKILLSLAB
                        </Typography>
                    </Box>

                    {/* Small screen logo */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        <RocketLaunchIcon
                            sx={{
                                mr: 1,
                                fontSize: '24px',
                                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                fontWeight: 700,
                                backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
                                backgroundClip: 'text',
                                color: 'transparent',
                                textDecoration: 'none',
                            }}
                        >
                            SKILLSLAB
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
                        <Button
                            component={RouterLink}
                            to="/problems"
                            sx={{
                                color: 'text.primary',
                                mx: 1,
                                '&:hover': {
                                    color: theme.palette.primary.light,
                                    background: 'rgba(255, 255, 255, 0.05)'
                                }
                            }}
                        >
                            Problems
                        </Button>
                        {isAdmin && isAuthenticated && (
                            <Button
                                component={RouterLink}
                                to="/admin"
                                sx={{
                                    color: 'text.primary',
                                    mx: 1,
                                    '&:hover': {
                                        color: theme.palette.primary.light,
                                        background: 'rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                                startIcon={<AdminPanelSettingsIcon />}
                            >
                                Admin
                            </Button>
                        )}
                    </Box>

                    {/* Search bar */}
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: alpha(theme.palette.background.paper, 0.35),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.background.paper, 0.45),
                            },
                            width: 'auto',
                            mx: 2,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        <Box sx={{ p: '0 16px', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center' }}>
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </Box>
                        <InputBase
                            placeholder="Search problems…"
                            sx={{
                                color: 'inherit',
                                '& .MuiInputBase-input': {
                                    padding: '10px 10px 10px 48px',
                                    width: '100%',
                                    minWidth: '220px',
                                },
                            }}
                        />
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAuthenticated ? (
                            <>
                                <Tooltip title="Notifications">
                                    <IconButton color="inherit" sx={{ mr: 1.5 }}>
                                        <Badge badgeContent={3} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{
                                            p: 0,
                                            border: `2px solid ${theme.palette.primary.main}`,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: theme.palette.secondary.main,
                                            }
                                        }}
                                    >
                                        <Avatar
                                            alt={user?.username || 'User'}
                                            src=""
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                bgcolor: theme.palette.primary.dark
                                            }}
                                        >
                                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    sx={{
                                        mt: '50px',
                                        '& .MuiPaper-root': {
                                            borderRadius: 3,
                                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)',
                                            background: theme.palette.background.paper,
                                            border: '1px solid rgba(255, 255, 255, 0.05)',
                                            backdropFilter: 'blur(20px)',
                                            minWidth: 200,
                                        }
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                mr: 2,
                                                bgcolor: theme.palette.primary.dark
                                            }}
                                        >
                                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {user?.username || 'User'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                                {user?.email || 'user@example.com'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                                    <MenuItem onClick={handleProfile} sx={{ py: 1.5, px: 2.5 }}>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" color="primary" />
                                        </ListItemIcon>
                                        <Typography>Profile</Typography>
                                    </MenuItem>

                                    <MenuItem sx={{ py: 1.5, px: 2.5 }}>
                                        <ListItemIcon>
                                            <SettingsIcon fontSize="small" color="primary" />
                                        </ListItemIcon>
                                        <Typography>Settings</Typography>
                                    </MenuItem>

                                    <MenuItem sx={{ py: 1.5, px: 2.5 }}>
                                        <ListItemIcon>
                                            <DarkModeIcon fontSize="small" color="primary" />
                                        </ListItemIcon>
                                        <Typography>Dark Mode</Typography>
                                    </MenuItem>

                                    {isAdmin && (
                                        <MenuItem onClick={handleAdmin} sx={{ py: 1.5, px: 2.5 }}>
                                            <ListItemIcon>
                                                <AdminPanelSettingsIcon fontSize="small" color="primary" />
                                            </ListItemIcon>
                                            <Typography>Admin Panel</Typography>
                                        </MenuItem>
                                    )}

                                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                                    <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2.5 }}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" color="error" />
                                        </ListItemIcon>
                                        <Typography>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    component={RouterLink}
                                    to="/login"
                                    variant="text"
                                    color="inherit"
                                    sx={{
                                        mr: 1.5,
                                        px: 3,
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to="/register"
                                    variant="contained"
                                    sx={{
                                        backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                        boxShadow: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.2)}`,
                                    }}
                                >
                                    Register
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
