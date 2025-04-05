import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import {
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    alpha,
    useMediaQuery,
    useTheme,
    Divider,
    Badge,
    ListItemText
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

interface SideNavigationProps {
    width: number;
    mobileOpen: boolean;
    handleToggleMobile: () => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
    width,
    mobileOpen,
    handleToggleMobile
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showLabels, setShowLabels] = useState(false);

    // For admin features
    const isAdmin = user?.is_admin || user?.email === 'admin@example.com';

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

    const handleMouseEnter = () => {
        setShowLabels(true);
    };

    const handleMouseLeave = () => {
        setShowLabels(false);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    // Main navigation items
    const mainNavItems = [
        { path: '/', icon: <HomeRoundedIcon />, label: 'Home' },
        { path: '/problems', icon: <CodeRoundedIcon />, label: 'Problems' },
        { path: '/learning', icon: <SchoolRoundedIcon />, label: 'Learning' },
        { path: '/leaderboard', icon: <LeaderboardRoundedIcon />, label: 'Leaderboard' },
    ];

    // Navigation items for logged-in users
    const authNavItems = [
        { path: '/profile', icon: <PersonRoundedIcon />, label: 'Profile' },
        { path: '/settings', icon: <SettingsRoundedIcon />, label: 'Settings' },
    ];

    // Admin only navigation items
    const adminNavItems = [
        { path: '/admin', icon: <AdminPanelSettingsRoundedIcon />, label: 'Admin' },
    ];

    // Navigation items for guests
    const guestNavItems = [
        { path: '/login', icon: <LoginRoundedIcon />, label: 'Login' },
        { path: '/register', icon: <AppRegistrationRoundedIcon />, label: 'Register' },
    ];

    // The drawer content - shared between permanent and temporary drawers
    const drawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 1
        }}>
            {/* Logo */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 2
            }}>
                <IconButton
                    edge="start"
                    onClick={handleToggleMobile}
                    sx={{ display: { sm: 'none' } }}
                >
                    <MenuRoundedIcon />
                </IconButton>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                    <RocketLaunchRoundedIcon
                        sx={{
                            fontSize: '32px',
                            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    />
                </Box>
            </Box>

            {/* Main Navigation */}
            <List sx={{ width: '100%', pt: 4 }}>
                {mainNavItems.map((item) => (
                    <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            sx={{
                                minHeight: 60,
                                justifyContent: 'center',
                                px: 2.5,
                                position: 'relative',
                                '&::before': {
                                    content: isActive(item.path) ? '""' : 'none',
                                    position: 'absolute',
                                    left: 0,
                                    top: '25%',
                                    height: '50%',
                                    width: 3,
                                    bgcolor: 'primary.main',
                                    borderTopRightRadius: 3,
                                    borderBottomRightRadius: 3,
                                },
                            }}
                        >
                            <Tooltip title={item.label} placement="right">
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: showLabels ? 2 : 0,
                                        justifyContent: 'center',
                                        color: isActive(item.path)
                                            ? theme.palette.primary.main
                                            : theme.palette.text.secondary,
                                        fontSize: 24,
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                            </Tooltip>
                            {showLabels && (
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        fontWeight: isActive(item.path) ? 600 : 400,
                                        sx: {
                                            opacity: showLabels ? 1 : 0,
                                            transition: 'opacity 0.2s',
                                            color: isActive(item.path)
                                                ? theme.palette.primary.main
                                                : theme.palette.text.secondary,
                                        },
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* Separator */}
            <Divider sx={{
                width: '50%',
                my: 2,
                borderColor: alpha(theme.palette.common.white, 0.1),
            }} />

            {/* Account Related Navigation */}
            <List sx={{ width: '100%', mb: 2 }}>
                {isAuthenticated ? (
                    <>
                        {authNavItems.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        minHeight: 60,
                                        justifyContent: 'center',
                                        px: 2.5,
                                        position: 'relative',
                                        '&::before': {
                                            content: isActive(item.path) ? '""' : 'none',
                                            position: 'absolute',
                                            left: 0,
                                            top: '25%',
                                            height: '50%',
                                            width: 3,
                                            bgcolor: 'primary.main',
                                            borderTopRightRadius: 3,
                                            borderBottomRightRadius: 3,
                                        },
                                    }}
                                >
                                    <Tooltip title={item.label} placement="right">
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: showLabels ? 2 : 0,
                                                justifyContent: 'center',
                                                color: isActive(item.path)
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.secondary,
                                                fontSize: 24,
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    </Tooltip>
                                    {showLabels && (
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                fontWeight: isActive(item.path) ? 600 : 400,
                                                sx: {
                                                    opacity: showLabels ? 1 : 0,
                                                    transition: 'opacity 0.2s',
                                                    color: isActive(item.path)
                                                        ? theme.palette.primary.main
                                                        : theme.palette.text.secondary,
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {/* Admin Only Items */}
                        {isAdmin && adminNavItems.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        minHeight: 60,
                                        justifyContent: 'center',
                                        px: 2.5,
                                        position: 'relative',
                                        '&::before': {
                                            content: isActive(item.path) ? '""' : 'none',
                                            position: 'absolute',
                                            left: 0,
                                            top: '25%',
                                            height: '50%',
                                            width: 3,
                                            bgcolor: 'primary.main',
                                            borderTopRightRadius: 3,
                                            borderBottomRightRadius: 3,
                                        },
                                    }}
                                >
                                    <Tooltip title={item.label} placement="right">
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: showLabels ? 2 : 0,
                                                justifyContent: 'center',
                                                color: isActive(item.path)
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.secondary,
                                                fontSize: 24,
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    </Tooltip>
                                    {showLabels && (
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                fontWeight: isActive(item.path) ? 600 : 400,
                                                sx: {
                                                    opacity: showLabels ? 1 : 0,
                                                    transition: 'opacity 0.2s',
                                                    color: isActive(item.path)
                                                        ? theme.palette.primary.main
                                                        : theme.palette.text.secondary,
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {/* Logout Button */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    minHeight: 60,
                                    justifyContent: 'center',
                                    px: 2.5,
                                }}
                            >
                                <Tooltip title="Logout" placement="right">
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: showLabels ? 2 : 0,
                                            justifyContent: 'center',
                                            color: theme.palette.error.main,
                                            fontSize: 24,
                                        }}
                                    >
                                        <LogoutRoundedIcon />
                                    </ListItemIcon>
                                </Tooltip>
                                {showLabels && (
                                    <ListItemText
                                        primary="Logout"
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                            fontWeight: 400,
                                            sx: {
                                                opacity: showLabels ? 1 : 0,
                                                transition: 'opacity 0.2s',
                                                color: theme.palette.error.main,
                                            },
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    // Guest Navigation Items
                    <>
                        {guestNavItems.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    sx={{
                                        minHeight: 60,
                                        justifyContent: 'center',
                                        px: 2.5,
                                        position: 'relative',
                                        '&::before': {
                                            content: isActive(item.path) ? '""' : 'none',
                                            position: 'absolute',
                                            left: 0,
                                            top: '25%',
                                            height: '50%',
                                            width: 3,
                                            bgcolor: 'primary.main',
                                            borderTopRightRadius: 3,
                                            borderBottomRightRadius: 3,
                                        },
                                    }}
                                >
                                    <Tooltip title={item.label} placement="right">
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: showLabels ? 2 : 0,
                                                justifyContent: 'center',
                                                color: isActive(item.path)
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.secondary,
                                                fontSize: 24,
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                    </Tooltip>
                                    {showLabels && (
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                fontWeight: isActive(item.path) ? 600 : 400,
                                                sx: {
                                                    opacity: showLabels ? 1 : 0,
                                                    transition: 'opacity 0.2s',
                                                    color: isActive(item.path)
                                                        ? theme.palette.primary.main
                                                        : theme.palette.text.secondary,
                                                },
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </>
                )}
            </List>

            {/* User Profile Avatar - For Mobile (Display Only) */}
            <Box sx={{ mt: 'auto', mb: 2, display: { xs: 'block', sm: 'none' } }}>
                {isAuthenticated ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color="success"
                        >
                            <Avatar
                                alt={user?.username || 'User'}
                                src=""
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: theme.palette.primary.dark,
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                            >
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                        </Badge>
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                            {user?.username || 'User'}
                        </Typography>
                    </Box>
                ) : (
                    <IconButton color="inherit">
                        <PersonRoundedIcon />
                    </IconButton>
                )}
            </Box>

            {/* User Avatar and Menu - For Desktop */}
            <Box
                sx={{
                    mt: 'auto',
                    mb: 2,
                    display: { xs: 'none', sm: 'block' },
                    textAlign: 'center'
                }}
            >
                {isAuthenticated && (
                    <>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                                color="success"
                            >
                                <Avatar
                                    alt={user?.username || 'User'}
                                    src=""
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: theme.palette.primary.dark,
                                        border: `2px solid ${theme.palette.primary.main}`
                                    }}
                                >
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                            </Badge>
                        </IconButton>
                    </>
                )}
            </Box>
        </Box>
    );

    return (
        <>
            {/* Desktop - Permanent sidebar */}
            <Box
                component="nav"
                sx={{
                    width: { sm: width },
                    flexShrink: { sm: 0 },
                    display: { xs: 'none', sm: 'block' }
                }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: width,
                            border: 'none',
                            bgcolor: 'transparent',
                            backdropFilter: 'blur(10px)',
                            backgroundImage: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: showLabels ? '4px 0 24px rgba(0, 0, 0, 0.3)' : 'none',
                            width: showLabels ? 200 : width,
                            overflowX: 'hidden',
                        },
                    }}
                    open
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Mobile - Temporary drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleToggleMobile}
                ModalProps={{
                    keepMounted: true, // Better mobile performance
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                        bgcolor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(10px)',
                    },
                }}
            >
                {drawer}
            </Drawer>

            {/* Top Utility Bar for Search, Notifications, etc */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: { xs: 0, sm: `${width}px` },
                    zIndex: 1100,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 1.5,
                    backdropFilter: 'blur(8px)',
                    bgcolor: 'transparent',
                }}
            >
                <IconButton
                    sx={{ mr: 1, display: { xs: 'flex', sm: 'none' } }}
                    onClick={handleToggleMobile}
                    color="inherit"
                >
                    <MenuRoundedIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton color="inherit" sx={{ mr: 1 }}>
                    <SearchRoundedIcon />
                </IconButton>

                {isAuthenticated && (
                    <IconButton color="inherit" sx={{ mr: 1 }}>
                        <Badge badgeContent={3} color="secondary">
                            <NotificationsRoundedIcon />
                        </Badge>
                    </IconButton>
                )}

                {isAuthenticated && (
                    <IconButton
                        color="inherit"
                        onClick={handleOpenUserMenu}
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                        <AccountCircleRoundedIcon />
                    </IconButton>
                )}
            </Box>

            {/* User Menu */}
            <Menu
                sx={{
                    mt: '45px',
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
                            bgcolor: theme.palette.primary.dark,
                            border: `2px solid ${theme.palette.primary.main}`
                        }}
                    >
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {user?.username || 'User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {isAdmin ? 'Administrator' : 'Member'}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                    <PersonRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                    <Typography>Profile</Typography>
                </MenuItem>

                <MenuItem onClick={() => { navigate('/settings'); handleCloseUserMenu(); }}>
                    <SettingsRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                    <Typography>Settings</Typography>
                </MenuItem>

                {isAdmin && (
                    <MenuItem onClick={() => { navigate('/admin'); handleCloseUserMenu(); }}>
                        <AdminPanelSettingsRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                        <Typography>Admin Dashboard</Typography>
                    </MenuItem>
                )}

                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                <MenuItem onClick={handleLogout}>
                    <LogoutRoundedIcon fontSize="small" sx={{ mr: 1.5 }} />
                    <Typography>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default SideNavigation;