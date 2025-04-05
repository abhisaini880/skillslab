import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    useTheme,
    useMediaQuery,
    Paper,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

const HomePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const features = [
        {
            title: 'Practice Coding Problems',
            description: 'Sharpen your skills with our diverse collection of coding challenges, from algorithms to system design.',
            icon: <CodeIcon fontSize="large" color="primary" />,
            action: () => navigate('/problems'),
        },
        {
            title: 'Learn Design Patterns',
            description: 'Master software design patterns through interactive exercises that simulate real-world scenarios.',
            icon: <DesignServicesIcon fontSize="large" color="primary" />,
            action: () => navigate('/problems?type=LLD'),
        },
        {
            title: 'Track Your Progress',
            description: 'Monitor your improvement with detailed performance analytics and skill assessment reports.',
            icon: <SchoolIcon fontSize="large" color="primary" />,
            action: () => navigate(isAuthenticated ? '/dashboard' : '/register'),
        },
        {
            title: 'Join the Community',
            description: 'Connect with fellow developers, share solutions, and learn from each other\'s approaches.',
            icon: <GroupIcon fontSize="large" color="primary" />,
            action: () => navigate(isAuthenticated ? '/community' : '/register'),
        },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundColor: 'primary.dark',
                    color: 'white',
                    py: { xs: 8, md: 12 },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    mb: 2,
                                }}
                            >
                                Master Software Design & Engineering Skills
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}
                            >
                                Practice coding challenges, system design problems, and interview preparation exercises
                                tailored for software engineers at all levels.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    onClick={() => navigate('/problems')}
                                    sx={{ minWidth: 150 }}
                                >
                                    Explore Problems
                                </Button>
                                {!isAuthenticated && (
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        color="inherit"
                                        onClick={() => navigate('/register')}
                                        sx={{ minWidth: 150 }}
                                    >
                                        Sign Up Free
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box
                                component="img"
                                src="/src/assets/hero-illustration.svg"
                                alt="Coding illustration"
                                sx={{
                                    width: '100%',
                                    maxHeight: 400,
                                    objectFit: 'contain',
                                    display: 'block',
                                    ml: 'auto',
                                }}
                                onError={(e) => {
                                    // Fallback if image doesn't exist
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{ mb: 6, fontWeight: 600 }}
                >
                    Level Up Your Software Engineering Skills
                </Typography>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-4px)',
                                    },
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    cursor: 'pointer',
                                }}
                                onClick={feature.action}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        {feature.icon}
                                        <Typography variant="h5" component="h3" sx={{ ml: 2, fontWeight: 500 }}>
                                            {feature.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: 'background.default', py: 8 }}>
                <Container maxWidth="md">
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 4, md: 6 },
                            textAlign: 'center',
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50',
                        }}
                    >
                        <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
                            Ready to improve your skills?
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
                            Join thousands of engineers who are enhancing their technical skills and preparing for their next career advancement.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => navigate(isAuthenticated ? '/problems' : '/register')}
                            sx={{ px: 4, py: 1.5 }}
                        >
                            {isAuthenticated ? 'Start Practicing' : 'Create Free Account'}
                        </Button>
                    </Paper>
                </Container>
            </Box>

            {/* How it Works Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{ mb: 6, fontWeight: 600 }}
                >
                    How SkillsLab Works
                </Typography>

                <Grid container spacing={isMobile ? 4 : 8}>
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    p: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h5">1</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Choose Your Challenge
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Select from a wide range of problem types including algorithms, system design, and SQL challenges.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    p: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h5">2</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Submit Your Solution
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Implement your solution and submit it for evaluation. Get instant feedback on your approach.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box textAlign="center">
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    p: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h5">3</Typography>
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                Track Your Progress
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Analyze your performance, identify areas for improvement, and watch your skills grow over time.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;