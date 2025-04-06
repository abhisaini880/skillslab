import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { RootState } from '@/store';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchProblems } from '@/store/slices/problemsSlice';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    CardActionArea,
    Button,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Chip,
    alpha,
    useTheme,
    IconButton,
    Tooltip,
    LinearProgress,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import DataObjectIcon from '@mui/icons-material/DataObject';

const AdminDashboardPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { problems } = useSelector((state: RootState) => state.problems);

    const [stats, setStats] = useState({
        totalUsers: 254,
        totalProblems: Array.isArray(problems) ? problems.length : 0,
        totalSubmissions: 1320,
        completionRate: 68.4,
    });

    // Mock data for dashboard
    const recentProblems = Array.isArray(problems)
        ? problems.slice(0, 5)
        : [];

    const recentUsers = [
        { id: '1', username: 'sarah_dev', email: 'sarah@example.com', date: '2023-05-12' },
        { id: '2', username: 'mike_coder', email: 'mike@example.com', date: '2023-05-11' },
        { id: '3', username: 'alex_js', email: 'alex@example.com', date: '2023-05-10' },
    ];

    useEffect(() => {
        // Fetch problems if not already loaded
        if (!Array.isArray(problems) || problems.length === 0) {
            dispatch(fetchProblems());
        }

        // Update stats when problems change
        if (Array.isArray(problems)) {
            setStats(prev => ({
                ...prev,
                totalProblems: problems.length
            }));
        }
    }, [dispatch, problems]);

    // Get problem type icon
    const getProblemTypeIcon = (type: string) => {
        switch (type) {
            case 'DSA':
                return <CodeIcon fontSize="small" />;
            case 'LLD':
                return <ArchitectureIcon fontSize="small" />;
            case 'HLD':
                return <DataObjectIcon fontSize="small" />;
            case 'SQL':
                return <StorageIcon fontSize="small" />;
            case 'DEVOPS':
                return <CloudIcon fontSize="small" />;
            default:
                return <CodeIcon fontSize="small" />;
        }
    };

    // Get difficulty color
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY':
                return theme.palette.success.main;
            case 'MEDIUM':
                return theme.palette.warning.main;
            case 'HARD':
                return theme.palette.error.main;
            default:
                return theme.palette.primary.main;
        }
    };

    return (
        <Box sx={{ pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Admin Dashboard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage and monitor all aspects of the SkillsLab platform
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddCircleIcon />}
                        onClick={() => navigate('/admin/problems/new')}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                        }}
                    >
                        Add New Problem
                    </Button>
                </Box>

                {/* Stats Overview */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" fontSize="0.875rem">
                                        Total Problems
                                    </Typography>
                                    <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>
                                        {stats.totalProblems}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                                        <Typography variant="body2" color="success.main" fontWeight={500}>
                                            +5% this week
                                        </Typography>
                                    </Box>
                                </Box>
                                <Avatar
                                    sx={{
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        width: 56,
                                        height: 56,
                                    }}
                                >
                                    <AssignmentIcon />
                                </Avatar>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.info.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" fontSize="0.875rem">
                                        Total Users
                                    </Typography>
                                    <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>
                                        {stats.totalUsers}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 0.5 }} />
                                        <Typography variant="body2" color="success.main" fontWeight={500}>
                                            +12% this month
                                        </Typography>
                                    </Box>
                                </Box>
                                <Avatar
                                    sx={{
                                        backgroundColor: alpha(theme.palette.info.main, 0.1),
                                        color: theme.palette.info.main,
                                        width: 56,
                                        height: 56,
                                    }}
                                >
                                    <PeopleAltIcon />
                                </Avatar>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.success.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" fontSize="0.875rem">
                                        Total Submissions
                                    </Typography>
                                    <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>
                                        {stats.totalSubmissions}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TrendingDownIcon fontSize="small" sx={{ color: theme.palette.error.main, mr: 0.5 }} />
                                        <Typography variant="body2" color="error.main" fontWeight={500}>
                                            -2% this week
                                        </Typography>
                                    </Box>
                                </Box>
                                <Avatar
                                    sx={{
                                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                                        color: theme.palette.success.main,
                                        width: 56,
                                        height: 56,
                                    }}
                                >
                                    <CheckCircleIcon />
                                </Avatar>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.warning.main, 0.05),
                                border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                                height: '100%',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" fontSize="0.875rem">
                                        Completion Rate
                                    </Typography>
                                    <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>
                                        {stats.completionRate}%
                                    </Typography>
                                </Box>
                                <Avatar
                                    sx={{
                                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                                        color: theme.palette.warning.main,
                                        width: 56,
                                        height: 56,
                                    }}
                                >
                                    <DashboardIcon />
                                </Avatar>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={stats.completionRate}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: theme.palette.warning.main,
                                    }
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                {/* Recent Problems */}
                <Grid item xs={12} lg={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            height: '100%',
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Recent Problems
                            </Typography>
                            <Button
                                component={RouterLink}
                                to="/admin/problems"
                                endIcon={<ArrowForwardIcon />}
                                size="small"
                                sx={{ textTransform: 'none' }}
                            >
                                View All
                            </Button>
                        </Box>

                        <List sx={{ p: 0 }}>
                            {recentProblems.length > 0 ? (
                                recentProblems.map((problem, index) => (
                                    <Box key={problem.id}>
                                        <ListItem
                                            sx={{
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: 2,
                                                '&:hover': {
                                                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                                                },
                                            }}
                                            secondaryAction={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Tooltip title="View">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate(`/problems/${problem.id}`)}
                                                            sx={{
                                                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                                                color: theme.palette.info.main,
                                                                '&:hover': {
                                                                    bgcolor: alpha(theme.palette.info.main, 0.2),
                                                                }
                                                            }}
                                                        >
                                                            <VisibilityIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => navigate(`/admin/problems/edit/${problem.id}`)}
                                                            sx={{
                                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                color: theme.palette.primary.main,
                                                                '&:hover': {
                                                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                        color: theme.palette.primary.main,
                                                    }}
                                                >
                                                    {getProblemTypeIcon(problem.type)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body1" fontWeight={500}>
                                                        {problem.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                                        <Chip
                                                            label={problem.type}
                                                            size="small"
                                                            sx={{
                                                                mr: 1,
                                                                fontSize: '0.7rem',
                                                                height: 20,
                                                                fontWeight: 500
                                                            }}
                                                        />
                                                        <Chip
                                                            label={problem.difficulty}
                                                            size="small"
                                                            sx={{
                                                                fontSize: '0.7rem',
                                                                height: 20,
                                                                bgcolor: alpha(getDifficultyColor(problem.difficulty), 0.1),
                                                                color: getDifficultyColor(problem.difficulty),
                                                                fontWeight: 500,
                                                                border: `1px solid ${alpha(getDifficultyColor(problem.difficulty), 0.3)}`
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < recentProblems.length - 1 && (
                                            <Divider component="li" sx={{ my: 1, opacity: 0.6 }} />
                                        )}
                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography color="text.secondary">
                                        No problems available yet
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
                                        startIcon={<AddCircleIcon />}
                                        onClick={() => navigate('/admin/problems/new')}
                                    >
                                        Add First Problem
                                    </Button>
                                </Box>
                            )}
                        </List>
                    </Paper>
                </Grid>

                {/* Recent Users */}
                <Grid item xs={12} lg={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            height: '100%',
                            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Recent Users
                            </Typography>
                            <Button
                                endIcon={<ArrowForwardIcon />}
                                size="small"
                                sx={{ textTransform: 'none' }}
                            >
                                View All
                            </Button>
                        </Box>

                        <List sx={{ p: 0 }}>
                            {recentUsers.map((user, index) => (
                                <Box key={user.id}>
                                    <ListItem
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            borderRadius: 2,
                                            '&:hover': {
                                                bgcolor: alpha(theme.palette.primary.main, 0.04),
                                            },
                                        }}
                                        secondaryAction={
                                            <Typography variant="caption" color="text.secondary">
                                                Joined {user.date}
                                            </Typography>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                                {user.username.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body1" fontWeight={500}>
                                                    {user.username}
                                                </Typography>
                                            }
                                            secondary={user.email}
                                        />
                                    </ListItem>
                                    {index < recentUsers.length - 1 && (
                                        <Divider component="li" sx={{ my: 1, opacity: 0.6 }} />
                                    )}
                                </Box>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Quick Action Cards */}
                <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                            Quick Actions
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => navigate('/admin/problems/new')}
                                        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                    >
                                        <Avatar
                                            sx={{
                                                mb: 2,
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main,
                                            }}
                                        >
                                            <AddCircleIcon />
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Add Problem
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Create a new problem for users to solve
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                    }}
                                >
                                    <CardActionArea
                                        onClick={() => navigate('/admin/problems')}
                                        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                    >
                                        <Avatar
                                            sx={{
                                                mb: 2,
                                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                                color: theme.palette.info.main,
                                            }}
                                        >
                                            <AssignmentIcon />
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Manage Problems
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Edit, delete or review existing problems
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                    }}
                                >
                                    <CardActionArea
                                        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                    >
                                        <Avatar
                                            sx={{
                                                mb: 2,
                                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                                color: theme.palette.success.main,
                                            }}
                                        >
                                            <PeopleAltIcon />
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            User Management
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Manage users, roles, and permissions
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                                    }}
                                >
                                    <CardActionArea
                                        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                    >
                                        <Avatar
                                            sx={{
                                                mb: 2,
                                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                color: theme.palette.warning.main,
                                            }}
                                        >
                                            <DashboardIcon />
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            Analytics
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            View detailed platform usage statistics
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboardPage;