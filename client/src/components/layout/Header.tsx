import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logout, getCurrentUser } from '@/store/slices/authSlice';
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
    Badge,
    InputBase,
    alpha,
    Divider,
    ListItemIcon,
    useTheme,
    Chip,
    useMediaQuery,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';

interface HeaderProps {
    toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userStreak, setUserStreak] = useState(7); // Mock streak data
    
    useEffect(() => {
        // If the user is authenticated but we don't have user data, fetch it
        if (isAuthenticated && !user) {
            dispatch(getCurrentUser());
        }
    }, [isAuthenticated, user, dispatch]);

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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    // Check if user is admin
    const isAdmin = user?.is_admin || user?.role === 'admin';
    
    // Navigation items for header and mobile drawer
    const navItems = [
        { name: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
        { name: 'Problems', path: '/problems', icon: <CodeIcon fontSize="small" /> },
        { name: 'Leaderboard', path: '/leaderboard', icon: <LeaderboardIcon fontSize="small" /> },
        { name: 'Learning', path: '/learning', icon: <SchoolIcon fontSize="small" /> },
        { name: 'Profile', path: '/profile', icon: <PersonIcon fontSize="small" />, authRequired: true },
        { name: 'Admin', path: '/admin', icon: <AdminPanelSettingsIcon fontSize="small" />, adminRequired: true }
    ];

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Toolbar sx={{ height: 64 }}>
                    {/* Logo and brand */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <RocketLaunchIcon sx={{ mr: 1, fontSize: 28, color: theme.palette.primary.main }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                letterSpacing: '0.05em',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            SKILLSLAB
                        </Typography>
                    </Box>

                    {/* Mobile menu toggle */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleMobileMenu}
                        sx={{ 
                            mr: 2, 
                            display: { sm: 'none' },
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 1,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Main Navigation - Desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                        {navItems.map((item) => {
                            // Skip admin items if user is not admin
                            if (item.adminRequired && (!isAuthenticated || !isAdmin)) return null;
                            // Skip auth required items if not authenticated
                            if (item.authRequired && !isAuthenticated) return null;
                            
                            const active = isActive(item.path);
                            
                            return (
                                <Button
                                    key={item.name}
                                    component={RouterLink}
                                    to={item.path}
                                    startIcon={item.icon}
                                    sx={{
                                        color: active ? 'primary.main' : 'text.secondary',
                                        borderRadius: 1,
                                        py: 1,
                                        px: 2,
                                        fontWeight: active ? 600 : 500,
                                        position: 'relative',
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        },
                                        '&::after': active ? {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 8,
                                            left: 12,
                                            right: 12,
                                            height: 2,
                                            backgroundColor: theme.palette.primary.main,
                                            borderRadius: 1,
                                        } : {},
                                    }}
                                >
                                    {item.name}
                                </Button>
                            );
                        })}
                    </Box>

                    {/* Search field */}
                    <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' }, mr: 2, flexGrow: { md: 0.5, lg: 0.3 } }}>
                        <Paper 
                            component="form"
                            elevation={0}
                            sx={{ 
                                p: '2px 8px',
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 1,
                                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                            }}
                        >
                            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                            <InputBase
                                placeholder="Search problems..."
                                inputProps={{ 'aria-label': 'search problems' }}
                                sx={{ ml: 1, flex: 1 }}
                            />
                        </Paper>
                    </Box>

                    {/* User streak */}
                    {isAuthenticated && (
                        <Chip
                            icon={
                                <LocalFireDepartmentIcon 
                                    sx={{ 
                                        color: theme.palette.warning.main,
                                        animation: userStreak > 5 ? 'pulse 1.5s infinite' : 'none',
                                        '@keyframes pulse': {
                                            '0%': {
                                                filter: 'brightness(100%)',
                                            },
                                            '50%': {
                                                filter: 'brightness(150%)',
                                            },
                                            '100%': {
                                                filter: 'brightness(100%)',
                                            },
                                        }
                                    }} 
                                />
                            }
                            label={userStreak}
                            sx={{ 
                                bgcolor: alpha(theme.palette.warning.main, 0.15),
                                border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                                color: theme.palette.warning.main,
                                mr: 2,
                                borderRadius: 1,
                                '& .MuiChip-label': {
                                    px: 1,
                                    fontWeight: 600
                                },
                                '& .MuiChip-icon': {
                                    color: theme.palette.warning.main,
                                },
                            }}
                        />
                    )}

                    {/* Notifications */}
                    {isAuthenticated && (
                        <IconButton 
                            color="inherit"
                            sx={{ 
                                mr: 2,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 1,
                            }}
                        >
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    )}

                    {/* Profile section */}
                    {isAuthenticated ? (
                        <>
                            <Chip
                                avatar={
                                    <Avatar
                                        alt={user?.username || 'User'}
                                        src=""
                                        sx={{
                                            bgcolor: theme.palette.primary.main,
                                            fontWeight: 600
                                        }}
                                    >
                                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                                    </Avatar>
                                }
                                label={user?.username || 'User'}
                                onClick={handleOpenUserMenu}
                                sx={{
                                    pl: 0.5,
                                    height: 40,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                    '& .MuiChip-label': {
                                        px: 1.5,
                                        display: { xs: 'none', sm: 'block' },
                                        fontWeight: 500,
                                    },
                                }}
                            />
                            <Menu
                                sx={{ mt: 5 }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseUserMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                PaperProps={{
                                    elevation: 3,
                                    sx: {
                                        backgroundColor: theme.palette.background.paper,
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 1,
                                        width: 240,
                                        overflow: 'visible',
                                        mt: 1.5,
                                        '&:before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            right: 15,
                                            width: 10,
                                            height: 10,
                                            bgcolor: theme.palette.background.paper,
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                            >
                                <Box sx={{ px: 2, py: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Avatar
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                bgcolor: theme.palette.primary.main,
                                                mr: 2
                                            }}
                                        >
                                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {user?.username || 'User'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>
                                                {user?.email || 'user@example.com'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {isAdmin && (
                                        <Chip
                                            size="small"
                                            label="Admin"
                                            color="primary"
                                            variant="outlined"
                                            sx={{ mb: 1, borderRadius: 1 }}
                                        />
                                    )}
                                </Box>

                                <Divider />
                                
                                <MenuItem onClick={handleProfile} sx={{ py: 1.5, borderRadius: 0 }}>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="small" color="primary" />
                                    </ListItemIcon>
                                    <Typography variant="body2">My Profile</Typography>
                                </MenuItem>
                                
                                <MenuItem sx={{ py: 1.5, borderRadius: 0 }}>
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="small" color="primary" />
                                    </ListItemIcon>
                                    <Typography variant="body2">Settings</Typography>
                                </MenuItem>
                                
                                {isAdmin && (
                                    <MenuItem onClick={handleAdmin} sx={{ py: 1.5, borderRadius: 0 }}>
                                        <ListItemIcon>
                                            <AdminPanelSettingsIcon fontSize="small" color="primary" />
                                        </ListItemIcon>
                                        <Typography variant="body2">Admin Panel</Typography>
                                    </MenuItem>
                                )}
                                
                                <Divider />
                                
                                <MenuItem onClick={handleLogout} sx={{ py: 1.5, borderRadius: 0 }}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" color="error" />
                                    </ListItemIcon>
                                    <Typography variant="body2" color="error">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="outlined"
                                color="primary"
                                sx={{
                                    display: { xs: 'none', sm: 'flex' },
                                    borderRadius: 1,
                                }}
                            >
                                Login
                            </Button>
                            <Button 
                                component={RouterLink} 
                                to="/register" 
                                variant="contained" 
                                color="primary"
                                sx={{ borderRadius: 1 }}
                            >
                                Register
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile navigation drawer */}
            <Drawer
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
                sx={{
                    display: { sm: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: 280,
                        backgroundColor: theme.palette.background.paper,
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RocketLaunchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        <Typography variant="h6" fontWeight={700} color="primary.main">
                            SKILLSLAB
                        </Typography>
                    </Box>
                    <IconButton onClick={toggleMobileMenu}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                {isAuthenticated && (
                    <>
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        width: 48,
                                        height: 48,
                                        mr: 2
                                    }}
                                >
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {user?.username || 'User'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {user?.email || 'user@example.com'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                <Chip
                                    icon={<LocalFireDepartmentIcon />}
                                    label={`${userStreak} day streak`}
                                    size="small"
                                    sx={{ 
                                        bgcolor: alpha(theme.palette.warning.main, 0.15),
                                        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                                        color: theme.palette.warning.main,
                                        borderRadius: 1,
                                        '& .MuiChip-icon': {
                                            color: theme.palette.warning.main,
                                        },
                                    }}
                                />
                                
                                {isAdmin && (
                                    <Chip
                                        label="Admin"
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ borderRadius: 1 }}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </>
                )}

                <Box sx={{ p: 2 }}>
                    {/* Search in mobile menu */}
                    <Paper 
                        component="form"
                        elevation={0}
                        sx={{ 
                            p: '2px 8px',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 1,
                            backgroundColor: alpha(theme.palette.background.paper, 0.5),
                        }}
                    >
                        <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                        <InputBase
                            placeholder="Search problems..."
                            inputProps={{ 'aria-label': 'search problems' }}
                            sx={{ ml: 1, flex: 1 }}
                        />
                    </Paper>

                    <List component="nav" sx={{ px: 0 }}>
                        {navItems.map((item) => {
                            // Skip admin items if user is not admin
                            if (item.adminRequired && (!isAuthenticated || !isAdmin)) return null;
                            // Skip auth required items if not authenticated
                            if (item.authRequired && !isAuthenticated) return null;
                            
                            const active = isActive(item.path);
                            
                            return (
                                <ListItemButton
                                    key={item.name}
                                    component={RouterLink}
                                    to={item.path}
                                    onClick={toggleMobileMenu}
                                    selected={active}
                                    sx={{
                                        borderRadius: 1,
                                        mb: 0.5,
                                        '&.Mui-selected': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.2),
                                            }
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: active ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.name}
                                        primaryTypographyProps={{
                                            color: active ? 'primary.main' : 'text.primary',
                                            fontWeight: active ? 600 : 500,
                                        }}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Box>

                {!isAuthenticated && (
                    <>
                        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
                        <Box sx={{ p: 2 }}>
                            <Button 
                                component={RouterLink} 
                                to="/login" 
                                variant="outlined" 
                                color="primary"
                                fullWidth
                                sx={{ mb: 1, borderRadius: 1 }}
                                onClick={toggleMobileMenu}
                            >
                                Login
                            </Button>
                            <Button 
                                component={RouterLink} 
                                to="/register" 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                sx={{ borderRadius: 1 }}
                                onClick={toggleMobileMenu}
                            >
                                Register
                            </Button>
                        </Box>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default Header;
