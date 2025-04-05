import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Grid,
    Tabs,
    Tab,
    Divider,
    List,
    ListItem,
    ListItemText,
    Chip,
    CircularProgress
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProfilePage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state: any) => state.auth);

    // In a real app, you'd fetch this data from an API
    const [problemsSolved, setProblemsSolved] = useState({
        easy: 12,
        medium: 8,
        hard: 3,
        total: 23
    });

    // In a real app, you'd fetch submission history from an API
    const [submissions, setSubmissions] = useState([
        { id: 1, problemName: 'Two Sum', status: 'Accepted', language: 'JavaScript', timestamp: '2023-06-15T14:32:00Z' },
        { id: 2, problemName: 'Valid Palindrome', status: 'Wrong Answer', language: 'Python', timestamp: '2023-06-14T10:15:00Z' },
        { id: 3, problemName: 'Merge Two Sorted Lists', status: 'Accepted', language: 'Java', timestamp: '2023-06-13T09:45:00Z' },
        { id: 4, problemName: 'Binary Search', status: 'Time Limit Exceeded', language: 'C++', timestamp: '2023-06-12T16:20:00Z' },
        { id: 5, problemName: 'Maximum Subarray', status: 'Accepted', language: 'JavaScript', timestamp: '2023-06-11T11:30:00Z' },
    ]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Chart data for problem types
    const pieChartData = {
        labels: ['Easy', 'Medium', 'Hard'],
        datasets: [
            {
                label: 'Problems Solved',
                data: [problemsSolved.easy, problemsSolved.medium, problemsSolved.hard],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart data for submission status
    const barChartData = {
        labels: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compile Error'],
        datasets: [
            {
                label: 'Submission Results',
                data: [3, 1, 1, 0, 0], // Sample data
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Grid container spacing={3}>
                {/* Profile Overview */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    mb: 2,
                                    bgcolor: 'primary.main'
                                }}
                            >
                                {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Typography variant="h5">{user?.name || 'User'}</Typography>
                            <Typography color="text.secondary">{user?.email || 'user@example.com'}</Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Stats Summary</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">Problems Solved</Typography>
                                        <Typography variant="h6">{problemsSolved.total}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">Success Rate</Typography>
                                        <Typography variant="h6">60%</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center', mt: 1 }}>
                                        <Typography variant="body2" color="text.secondary">Current Streak</Typography>
                                        <Typography variant="h6">5 days</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Skills</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                <Chip label="Algorithms" size="small" />
                                <Chip label="Data Structures" size="small" />
                                <Chip label="Dynamic Programming" size="small" />
                                <Chip label="System Design" size="small" />
                                <Chip label="Database" size="small" />
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Tabs Section */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={2}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tab label="Progress" />
                            <Tab label="Submissions" />
                            <Tab label="Activity" />
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <Typography variant="h6" gutterBottom>Problem Solving Progress</Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Box p={2} height={250} display="flex" justifyContent="center">
                                        <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box p={2} height={250} display="flex" justifyContent="center">
                                        <Bar
                                            data={barChartData}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        ticks: {
                                                            stepSize: 1
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box mt={3}>
                                <Typography variant="subtitle1" gutterBottom>Recent Achievements</Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Solved 5 Easy Problems"
                                            secondary="Earned on June 10, 2023"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="3-Day Streak"
                                            secondary="Earned on June 8, 2023"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="First Medium Problem"
                                            secondary="Earned on June 5, 2023"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <Typography variant="h6" gutterBottom>Recent Submissions</Typography>

                            <List>
                                {submissions.map((submission) => (
                                    <ListItem key={submission.id} sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
                                        <ListItemText
                                            primary={submission.problemName}
                                            secondary={`${submission.language} • ${new Date(submission.timestamp).toLocaleString()}`}
                                        />
                                        <Chip
                                            label={submission.status}
                                            size="small"
                                            color={submission.status === 'Accepted' ? 'success' : 'default'}
                                            sx={{ minWidth: 100, textAlign: 'center' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Typography variant="h6" gutterBottom>Activity Log</Typography>

                            <List>
                                <ListItem sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
                                    <ListItemText
                                        primary="Solved Two Sum problem"
                                        secondary="June 15, 2023 - 2:32 PM"
                                    />
                                </ListItem>
                                <ListItem sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
                                    <ListItemText
                                        primary="Attempted Valid Palindrome problem"
                                        secondary="June 14, 2023 - 10:15 AM"
                                    />
                                </ListItem>
                                <ListItem sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
                                    <ListItemText
                                        primary="Updated profile information"
                                        secondary="June 14, 2023 - 9:22 AM"
                                    />
                                </ListItem>
                                <ListItem sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
                                    <ListItemText
                                        primary="Completed daily challenge"
                                        secondary="June 13, 2023 - 5:45 PM"
                                    />
                                </ListItem>
                                <ListItem sx={{ borderBottom: '1px solid #eee', py: 1.5 }}>
                                    <ListItemText
                                        primary="Joined SkillsLab platform"
                                        secondary="June 10, 2023 - 3:18 PM"
                                    />
                                </ListItem>
                            </List>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;