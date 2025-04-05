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
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { RootState } from '@/store';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    const theme = useTheme();
    const drawerWidth = 260;

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const isAdmin = user?.is_admin || user?.email === 'admin@example.com';

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.25)',
                },
            }}
            variant="temporary"
        >
            {/* Logo Header */}
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}
            >
                <RocketLaunchIcon
                    sx={{
                        mr: 1.5,
                        fontSize: '28px',
                        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    SKILLSLAB
                </Typography>
            </Box>

            {isAuthenticated && (
                <>
                    <Box sx={{ px: 3, pb: 2 }}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                background: `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.2)}, ${alpha(theme.palette.background.paper, 0.2)})`,
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 45,
                                    height: 45,
                                    bgcolor: theme.palette.primary.dark,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                }}
                            >
                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Box sx={{ ml: 1.5 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                    {user?.username || 'User'}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                    {isAdmin ? 'Admin' : 'Member'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
                </>
            )}

            <Box sx={{ py: 2 }}>
                <Typography
                    variant="overline"
                    sx={{
                        px: 3,
                        py: 0.5,
                        display: 'block',
                        color: 'text.secondary',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        fontWeight: 500,
                    }}
                >
                    Main
                </Typography>

                <List sx={{ px: 2 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={NavLink}
                            to="/"
                            onClick={onClose}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                background: isActive('/') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                '&:hover': {
                                    background: isActive('/')
                                        ? alpha(theme.palette.primary.main, 0.2)
                                        : alpha(theme.palette.common.white, 0.05),
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
                                    fontWeight: isActive('/') ? 600 : 400,
                                    color: isActive('/') ? theme.palette.primary.main : 'text.primary',
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
                                borderRadius: 2,
                                mb: 0.5,
                                background: isActive('/problems') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                '&:hover': {
                                    background: isActive('/problems')
                                        ? alpha(theme.palette.primary.main, 0.2)
                                        : alpha(theme.palette.common.white, 0.05),
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
                                    fontWeight: isActive('/problems') ? 600 : 400,
                                    color: isActive('/problems') ? theme.palette.primary.main : 'text.primary',
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
                                borderRadius: 2,
                                mb: 0.5,
                                background: isActive('/leaderboard') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                '&:hover': {
                                    background: isActive('/leaderboard')
                                        ? alpha(theme.palette.primary.main, 0.2)
                                        : alpha(theme.palette.common.white, 0.05),
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
                                    fontWeight: isActive('/leaderboard') ? 600 : 400,
                                    color: isActive('/leaderboard') ? theme.palette.primary.main : 'text.primary',
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
                                borderRadius: 2,
                                mb: 0.5,
                                background: isActive('/learning') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                '&:hover': {
                                    background: isActive('/learning')
                                        ? alpha(theme.palette.primary.main, 0.2)
                                        : alpha(theme.palette.common.white, 0.05),
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
                                    fontWeight: isActive('/learning') ? 600 : 400,
                                    color: isActive('/learning') ? theme.palette.primary.main : 'text.primary',
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
                                fontWeight: 500,
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
                                        borderRadius: 2,
                                        mb: 0.5,
                                        background: isActive('/profile') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/profile')
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.common.white, 0.05),
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
                                            fontWeight: isActive('/profile') ? 600 : 400,
                                            color: isActive('/profile') ? theme.palette.primary.main : 'text.primary',
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
                                        borderRadius: 2,
                                        mb: 0.5,
                                        background: isActive('/progress') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/progress')
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.common.white, 0.05),
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
                                            fontWeight: isActive('/progress') ? 600 : 400,
                                            color: isActive('/progress') ? theme.palette.primary.main : 'text.primary',
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
                                fontWeight: 500,
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
                                        borderRadius: 2,
                                        mb: 0.5,
                                        background: isActive('/admin') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/admin')
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.common.white, 0.05),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/admin') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Dashboard"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/admin') ? 600 : 400,
                                            color: isActive('/admin') ? theme.palette.primary.main : 'text.primary',
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
                                        borderRadius: 2,
                                        mb: 0.5,
                                        background: isActive('/admin/problems') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/admin/problems')
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.common.white, 0.05),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/admin/problems') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <CodeIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Manage Problems"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/admin/problems') ? 600 : 400,
                                            color: isActive('/admin/problems') ? theme.palette.primary.main : 'text.primary',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}

                {!isAuthenticated && (
                    <>
                        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.05)' }} />

                        <List sx={{ px: 2 }}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to="/login"
                                    onClick={onClose}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 0.5,
                                        background: isActive('/login') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/login')
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.common.white, 0.05),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/login') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <LoginIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Login"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/login') ? 600 : 400,
                                            color: isActive('/login') ? theme.palette.primary.main : 'text.primary',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={NavLink}
                                    to="/register"
                                    onClick={onClose}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 0.5,
                                        background: isActive('/register') ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                                        '&:hover': {
                                            background: isActive('/register')
                                                ? alpha(theme.palette.primary.main, 0.2)
                                                : alpha(theme.palette.common.white, 0.05),
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive('/register') ? theme.palette.primary.main : 'text.secondary',
                                            minWidth: 36,
                                        }}
                                    >
                                        <AppRegistrationIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Register"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/register') ? 600 : 400,
                                            color: isActive('/register') ? theme.palette.primary.main : 'text.primary',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default Sidebar;
