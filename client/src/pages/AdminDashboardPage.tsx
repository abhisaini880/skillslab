import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Card,
    CardContent,
    CardActions,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider,
    alpha,
    useTheme,
    Chip
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const AdminDashboardPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // Sample data for recent registrations
    const recentUsers = [
        { id: 1, name: 'Sophia Lee', email: 'sophia@example.com', date: '2023-06-15' },
        { id: 2, name: 'Michael Chen', email: 'michael@example.com', date: '2023-06-14' },
        { id: 3, name: 'Emma Wilson', email: 'emma@example.com', date: '2023-06-13' },
        { id: 4, name: 'James Rodriguez', email: 'james@example.com', date: '2023-06-12' },
    ];

    // Sample data for recent submissions
    const recentSubmissions = [
        { id: 1, user: 'Alex Kim', problem: 'Two Sum', status: 'Accepted', date: '2023-06-15' },
        { id: 2, user: 'Jessica Wang', problem: 'LRU Cache', status: 'Wrong Answer', date: '2023-06-15' },
        { id: 3, user: 'Daniel Park', problem: 'Binary Tree Inorder Traversal', status: 'Accepted', date: '2023-06-14' },
        { id: 4, user: 'Olivia Martinez', problem: 'Merge k Sorted Lists', status: 'Time Limit Exceeded', date: '2023-06-14' },
    ];

    // Stats data
    const stats = [
        { title: 'Total Problems', count: 125, icon: <CodeRoundedIcon fontSize="large" sx={{ color: theme.palette.primary.main }} /> },
        { title: 'Total Users', count: 2450, icon: <PeopleAltRoundedIcon fontSize="large" sx={{ color: theme.palette.success.main }} /> },
        { title: 'Total Submissions', count: 18765, icon: <SendRoundedIcon fontSize="large" sx={{ color: theme.palette.warning.main }} /> },
        { title: 'Company Partners', count: 14, icon: <BusinessRoundedIcon fontSize="large" sx={{ color: theme.palette.info.main }} /> },
    ];

    // Admin modules
    const adminModules = [
        {
            title: 'Problem Management',
            description: 'Create, edit, and manage coding problems and challenges',
            icon: <CodeRoundedIcon fontSize="large" />,
            color: theme.palette.primary.main,
            link: '/admin/problems'
        },
        {
            title: 'User Management',
            description: 'Manage user accounts, roles, and permissions',
            icon: <PeopleAltRoundedIcon fontSize="large" />,
            color: theme.palette.success.main,
            link: '/admin/users'
        },
        {
            title: 'Company Management',
            description: 'Manage partner companies and their custom contests',
            icon: <BusinessRoundedIcon fontSize="large" />,
            color: theme.palette.info.main,
            link: '/admin/companies'
        },
        {
            title: 'Analytics',
            description: 'View platform metrics, user statistics, and performance data',
            icon: <InsightsRoundedIcon fontSize="large" />,
            color: theme.palette.warning.main,
            link: '/admin/analytics'
        },
        {
            title: 'Settings',
            description: 'Configure platform settings and preferences',
            icon: <SettingsRoundedIcon fontSize="large" />,
            color: theme.palette.error.main,
            link: '/admin/settings'
        },
        {
            title: 'Reports',
            description: 'View and export platform usage reports',
            icon: <AssessmentRoundedIcon fontSize="large" />,
            color: theme.palette.secondary.main,
            link: '/admin/reports'
        },
    ];

    // Handle card click
    const handleModuleClick = (link: string) => {
        navigate(link);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        color: 'transparent',
                        display: 'inline-block'
                    }}
                >
                    Admin Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Manage and monitor all aspects of the SkillsLab platform
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: theme.shape.borderRadius,
                                background: alpha(theme.palette.background.paper, 0.6),
                                backdropFilter: 'blur(10px)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                {stat.icon}
                                <Typography variant="h6" sx={{ ml: 1, opacity: 0.7 }}>
                                    {stat.title}
                                </Typography>
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                {stat.count.toLocaleString()}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Admin Modules */}
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Administration
            </Typography>
            <Grid container spacing={3} sx={{ mb: 5 }}>
                {adminModules.map((module, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={1}
                            sx={{
                                height: '100%',
                                borderRadius: theme.shape.borderRadius,
                                overflow: 'hidden',
                                background: alpha(theme.palette.background.paper, 0.6),
                                backdropFilter: 'blur(10px)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                                },
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                            onClick={() => handleModuleClick(module.link)}
                        >
                            <Box sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: '1px solid',
                                borderColor: alpha(theme.palette.divider, 0.1),
                            }}>
                                <Avatar
                                    sx={{
                                        bgcolor: alpha(module.color, 0.1),
                                        color: module.color,
                                        width: 56,
                                        height: 56
                                    }}
                                >
                                    {module.icon}
                                </Avatar>
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {module.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {module.description}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: 1,
                                mt: 'auto'
                            }}>
                                <Button
                                    endIcon={<ArrowForwardRoundedIcon />}
                                    sx={{ color: module.color }}
                                >
                                    Access
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Activity Section */}
            <Grid container spacing={3}>
                {/* Recent Users */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={1}
                        sx={{
                            borderRadius: theme.shape.borderRadius,
                            background: alpha(theme.palette.background.paper, 0.6),
                            backdropFilter: 'blur(10px)',
                            height: '100%',
                        }}
                    >
                        <Box sx={{
                            p: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid',
                            borderColor: alpha(theme.palette.divider, 0.1),
                        }}>
                            <Typography variant="h6" fontWeight={600}>
                                Recent Registrations
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowForwardRoundedIcon />}
                                onClick={() => navigate('/admin/users')}
                            >
                                View All
                            </Button>
                        </Box>
                        <List sx={{ pt: 0 }}>
                            {recentUsers.map((user, index) => (
                                <React.Fragment key={user.id}>
                                    <ListItem sx={{ py: 2 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                                {user.name.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.name}
                                            secondary={user.email}
                                        />
                                        <ListItemSecondaryAction>
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(user.date).toLocaleDateString()}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {index < recentUsers.length - 1 && (
                                        <Divider variant="inset" component="li" />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Recent Submissions */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={1}
                        sx={{
                            borderRadius: theme.shape.borderRadius,
                            background: alpha(theme.palette.background.paper, 0.6),
                            backdropFilter: 'blur(10px)',
                            height: '100%',
                        }}
                    >
                        <Box sx={{
                            p: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid',
                            borderColor: alpha(theme.palette.divider, 0.1),
                        }}>
                            <Typography variant="h6" fontWeight={600}>
                                Recent Submissions
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowForwardRoundedIcon />}
                                onClick={() => navigate('/admin/submissions')}
                            >
                                View All
                            </Button>
                        </Box>
                        <List sx={{ pt: 0 }}>
                            {recentSubmissions.map((submission, index) => (
                                <React.Fragment key={submission.id}>
                                    <ListItem sx={{ py: 2 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{
                                                bgcolor: submission.status === 'Accepted'
                                                    ? theme.palette.success.main
                                                    : submission.status === 'Wrong Answer'
                                                        ? theme.palette.error.main
                                                        : theme.palette.warning.main
                                            }}>
                                                {submission.user.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={submission.problem}
                                            secondary={`by ${submission.user}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <Chip
                                                label={submission.status}
                                                size="small"
                                                sx={{
                                                    bgcolor: submission.status === 'Accepted'
                                                        ? alpha(theme.palette.success.main, 0.1)
                                                        : submission.status === 'Wrong Answer'
                                                            ? alpha(theme.palette.error.main, 0.1)
                                                            : alpha(theme.palette.warning.main, 0.1),
                                                    color: submission.status === 'Accepted'
                                                        ? theme.palette.success.main
                                                        : submission.status === 'Wrong Answer'
                                                            ? theme.palette.error.main
                                                            : theme.palette.warning.main,
                                                    fontWeight: 600,
                                                    mr: 2
                                                }}
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {new Date(submission.date).toLocaleDateString()}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {index < recentSubmissions.length - 1 && (
                                        <Divider variant="inset" component="li" />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* Quick Actions */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                    Quick Actions
                </Typography>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={<AddRoundedIcon />}
                            onClick={() => navigate('/admin/problems/new')}
                            sx={{
                                backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                            }}
                        >
                            Add New Problem
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/users')}
                        >
                            Manage Users
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/settings')}
                        >
                            System Settings
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AdminDashboardPage;