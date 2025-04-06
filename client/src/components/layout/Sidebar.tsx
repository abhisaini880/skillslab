import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    alpha,
    Avatar,
    useTheme,
    Tooltip,
    IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TimelineIcon from '@mui/icons-material/Timeline';
import ForumIcon from '@mui/icons-material/Forum';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { RootState } from '@/store';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
    variant: "permanent" | "temporary";
    width: number;
}

const Sidebar = ({ open, onClose, variant, width }: SidebarProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    const theme = useTheme();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    const isAdmin = user?.is_admin || user?.role === 'admin';

    const sidebarContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo Header */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <RocketLaunchIcon
                        sx={{
                            mr: 1.5,
                            fontSize: '28px',
                            color: theme.palette.primary.main,
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            color: theme.palette.primary.main,
                        }}
                    >
                        SKILLS
                        <Box component="span" sx={{ color: theme.palette.text.primary }}>LAB</Box>
                    </Typography>
                </Box>

                {variant === "temporary" && (
                    <IconButton onClick={onClose} size="small" sx={{ mr: -1 }}>
                        <MenuOpenIcon />
                    </IconButton>
                )}
            </Box>

            {isAuthenticated && (
                <>
                    <Box sx={{ px: 3, pb: 2 }}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                background: alpha(theme.palette.primary.main, 0.03),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 42,
                                    height: 42,
                                    bgcolor: theme.palette.primary.main,
                                    color: '#fff',
                                }}
                            >
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Box sx={{ ml: 1.5 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                                    {user?.username || 'User'}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                    {isAdmin ? 'Admin' : 'Member'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.5) }} />
                </>
            )}

            <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2 }}>
                <Typography
                    variant="overline"
                    sx={{
                        px: 3,
                        py: 0.5,
                        display: 'block',
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                    }}
                >
                    Main Navigation
                </Typography>

                <List sx={{ px: 2 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/"
                            onClick={onClose}
                            sx={{
                                borderRadius: 1.5,
                                mb: 0.5,
                                background: isActive('/') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                '&:hover': {
                                    background: isActive('/')
                                        ? alpha(theme.palette.primary.main, 0.12)
                                        : alpha(theme.palette.action.hover, 0.1),
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive('/') ? theme.palette.primary.main : 'text.secondary',
                                    minWidth: 36,
                                }}
                            >
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Home"
                                primaryTypographyProps={{
                                    fontWeight: isActive('/') ? 600 : 500,
                                    color: isActive('/') ? theme.palette.primary.main : 'text.primary',
                                    fontSize: '0.9rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/problems"
                            onClick={onClose}
                            sx={{
                                borderRadius: 1.5,
                                mb: 0.5,
                                background: isActive('/problems') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                '&:hover': {
                                    background: isActive('/problems')
                                        ? alpha(theme.palette.primary.main, 0.12)
                                        : alpha(theme.palette.action.hover, 0.1),
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive('/problems') ? theme.palette.primary.main : 'text.secondary',
                                    minWidth: 36,
                                }}
                            >
                                <CodeIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Problems"
                                primaryTypographyProps={{
                                    fontWeight: isActive('/problems') ? 600 : 500,
                                    color: isActive('/problems') ? theme.palette.primary.main : 'text.primary',
                                    fontSize: '0.9rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/leaderboard"
                            onClick={onClose}
                            sx={{
                                borderRadius: 1.5,
                                mb: 0.5,
                                background: isActive('/leaderboard') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                '&:hover': {
                                    background: isActive('/leaderboard')
                                        ? alpha(theme.palette.primary.main, 0.12)
                                        : alpha(theme.palette.action.hover, 0.1),
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive('/leaderboard') ? theme.palette.primary.main : 'text.secondary',
                                    minWidth: 36,
                                }}
                            >
                                <LeaderboardIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Leaderboard"
                                primaryTypographyProps={{
                                    fontWeight: isActive('/leaderboard') ? 600 : 500,
                                    color: isActive('/leaderboard') ? theme.palette.primary.main : 'text.primary',
                                    fontSize: '0.9rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/learning"
                            onClick={onClose}
                            sx={{
                                borderRadius: 1.5,
                                mb: 0.5,
                                background: isActive('/learning') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                '&:hover': {
                                    background: isActive('/learning')
                                        ? alpha(theme.palette.primary.main, 0.12)
                                        : alpha(theme.palette.action.hover, 0.1),
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isActive('/learning') ? theme.palette.primary.main : 'text.secondary',
                                    minWidth: 36,
                                }}
                            >
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Learning"
                                primaryTypographyProps={{
                                    fontWeight: isActive('/learning') ? 600 : 500,
                                    color: isActive('/learning') ? theme.palette.primary.main : 'text.primary',
                                    fontSize: '0.9rem',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>

                {isAuthenticated && (
                    <>
                        <Typography
                            variant="overline"
                            sx={{
                                mt: 2,
                                px: 3,
                                py: 0.5,
                                display: 'block',
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                letterSpacing: '0.08em',
                                fontWeight: 600,
                            }}
                        >
                            Personal
                        </Typography>
                        <List sx={{ px: 2 }}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to="/profile"
                                    onClick={onClose}
                                    sx={{
                                        borderRadius: 1.5,
                                        mb: 0.5,
                                        background: isActive('/profile') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/profile')
                                                ? alpha(theme.palette.primary.main, 0.12)
                                                : alpha(theme.palette.action.hover, 0.1),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/profile') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Profile"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/profile') ? 600 : 500,
                                            color: isActive('/profile') ? theme.palette.primary.main : 'text.primary',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to="/progress"
                                    onClick={onClose}
                                    sx={{
                                        borderRadius: 1.5,
                                        mb: 0.5,
                                        background: isActive('/progress') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/progress')
                                                ? alpha(theme.palette.primary.main, 0.12)
                                                : alpha(theme.palette.action.hover, 0.1),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/progress') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <TimelineIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Progress"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/progress') ? 600 : 500,
                                            color: isActive('/progress') ? theme.palette.primary.main : 'text.primary',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}

                {isAdmin && isAuthenticated && (
                    <>
                        <Typography
                            variant="overline"
                            sx={{
                                mt: 2,
                                px: 3,
                                py: 0.5,
                                display: 'block',
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                letterSpacing: '0.08em',
                                fontWeight: 600,
                            }}
                        >
                            Admin
                        </Typography>
                        <List sx={{ px: 2 }}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to="/admin"
                                    onClick={onClose}
                                    sx={{
                                        borderRadius: 1.5,
                                        mb: 0.5,
                                        background: isActive('/admin') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/admin')
                                                ? alpha(theme.palette.primary.main, 0.12)
                                                : alpha(theme.palette.action.hover, 0.1),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/admin') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Dashboard"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/admin') ? 600 : 500,
                                            color: isActive('/admin') ? theme.palette.primary.main : 'text.primary',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to="/admin/problems"
                                    onClick={onClose}
                                    sx={{
                                        borderRadius: 1.5,
                                        mb: 0.5,
                                        background: isActive('/admin/problems') ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/admin/problems')
                                                ? alpha(theme.palette.primary.main, 0.12)
                                                : alpha(theme.palette.action.hover, 0.1),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/admin/problems') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Manage Problems"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/admin/problems') ? 600 : 500,
                                            color: isActive('/admin/problems') ? theme.palette.primary.main : 'text.primary',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}
            </Box>

            {!isAuthenticated && (
                <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
                    <List disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to="/login"
                                onClick={onClose}
                                sx={{
                                    borderRadius: 1.5,
                                    mb: 0.5,
                                    background: isActive('/login') ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.04),
                                    '&:hover': {
                                        background: isActive('/login')
                                            ? alpha(theme.palette.primary.main, 0.12)
                                            : alpha(theme.palette.primary.main, 0.08),
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: isActive('/login') ? theme.palette.primary.main : theme.palette.primary.main,
                                        minWidth: 36,
                                    }}
                                >
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Login"
                                    primaryTypographyProps={{
                                        fontWeight: 600,
                                        color: theme.palette.primary.main,
                                        fontSize: '0.9rem',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            )}
        </Box>
    );

    // Conditional rendering based on variant
    if (variant === "temporary") {
        return (
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: width,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        );
    }

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                display: { xs: 'none', lg: 'block' },
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    boxShadow: open ? '0px 2px 10px rgba(0, 0, 0, 0.05)' : 'none',
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    width: open ? width : 0,
                },
            }}
        >
            {sidebarContent}
        </Drawer>
    );
};

export default Sidebar;
