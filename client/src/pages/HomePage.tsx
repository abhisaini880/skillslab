import React from 'react';
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
    Stack,
    Chip,
    alpha,
    Avatar,
    Divider,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ForumIcon from '@mui/icons-material/Forum';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import TerminalIcon from '@mui/icons-material/Terminal';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const HomePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const problemTypes = [
        { name: 'Algorithms', icon: <CodeIcon />, color: theme.palette.primary.main },
        { name: 'System Design', icon: <DesignServicesIcon />, color: theme.palette.secondary.main },
        { name: 'SQL', icon: <StorageIcon />, color: '#10b981' },
        { name: 'DevOps', icon: <CloudIcon />, color: '#f59e0b' },
        { name: 'Linux', icon: <TerminalIcon />, color: '#ef4444' },
    ];

    const features = [
        {
            title: 'Practice Coding Problems',
            description: 'Sharpen your skills with our diverse collection of coding challenges, from algorithms to system design.',
            icon: <CodeIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
            action: () => navigate('/problems'),
        },
        {
            title: 'Learn Design Patterns',
            description: 'Master software architecture through interactive exercises and real-world system design scenarios.',
            icon: <DesignServicesIcon fontSize="large" sx={{ color: theme.palette.secondary.main }} />,
            action: () => navigate('/problems?type=LLD'),
        },
        {
            title: 'Track Your Progress',
            description: 'Monitor your improvement with detailed analytics, skill assessments, and daily streaks.',
            icon: <SchoolIcon fontSize="large" sx={{ color: '#10b981' }} />,
            action: () => navigate(isAuthenticated ? '/profile' : '/register'),
        },
        {
            title: 'Join the Community',
            description: 'Connect with fellow developers, discuss solutions, and learn from each other\'s approaches.',
            icon: < ForumIcon fontSize="large" sx={{ color: '#f59e0b' }} />,
            action: () => navigate('/discuss'),
        },
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Senior Developer",
            text: "SkillsLab's system design challenges helped me prepare for technical interviews at top tech companies. The interactive whiteboards were a game-changer.",
            avatar: "S",
        },
        {
            name: "Michael Chen",
            role: "Software Engineer",
            text: "I've improved my algorithm skills significantly in just 3 months. The variety of problem types and difficulty levels keeps me engaged.",
            avatar: "M",
        },
        {
            name: "Aisha Patel",
            role: "Backend Developer",
            text: "The SQL and DevOps exercises are perfect for my role. I appreciate how practical and industry-relevant all the challenges are.",
            avatar: "A",
        },
    ];

    return (
        <>
            <Box sx={{ overflow: 'hidden' }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
                        position: 'relative',
                        pt: { xs: 10, md: 12 },
                        pb: { xs: 12, md: 16 },
                    }}
                >
                    {/* Abstract shapes for visual interest */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            right: '5%',
                            width: '30%',
                            height: '35%',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                            zIndex: 0,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '5%',
                            left: '10%',
                            width: '25%',
                            height: '25%',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
                            zIndex: 0,
                        }}
                    />

                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={7}>
                                <Box>
                                    <Chip
                                        icon={<RocketLaunchIcon fontSize="small" />}
                                        label="The Ultimate Platform for Developer Growth"
                                        sx={{
                                            mb: 3,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                            borderRadius: 1,
                                            '& .MuiChip-icon': { color: theme.palette.primary.main }
                                        }}
                                    />
                                    <Typography
                                        variant="h2"
                                        component="h1"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: { xs: '2.5rem', md: '3.75rem' },
                                            mb: 2,
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        Master Software Engineering Skills
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{ mb: 4, fontWeight: 400, color: 'text.secondary', maxWidth: '90%' }}
                                    >
                                        Practice coding challenges, system design problems, and build practical engineering skills
                                        with our specialized sandbox environments.
                                    </Typography>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 6 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={() => navigate('/problems')}
                                            sx={{
                                                py: 1.5,
                                                px: 3.5,
                                                fontWeight: 600,
                                                borderRadius: 1,
                                                textTransform: 'none',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            Explore Problems
                                        </Button>
                                        {!isAuthenticated && (
                                            <Button
                                                variant="outlined"
                                                size="large"
                                                onClick={() => navigate('/register')}
                                                sx={{
                                                    py: 1.5,
                                                    px: 3.5,
                                                    fontWeight: 600,
                                                    borderRadius: 1,
                                                    textTransform: 'none',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                Create Account
                                            </Button>
                                        )}
                                    </Stack>

                                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: 'text.secondary',
                                                display: 'flex',
                                                alignItems: 'center',
                                                mr: 1
                                            }}
                                        >
                                            <LocalFireDepartmentIcon
                                                fontSize="small"
                                                sx={{ color: theme.palette.warning.main, mr: 0.5 }}
                                            />
                                            Practice with:
                                        </Typography>
                                        {problemTypes.map((type, index) => (
                                            <Chip
                                                key={index}
                                                icon={React.cloneElement(type.icon, {
                                                    fontSize: 'small',
                                                    sx: { color: type.color }
                                                })}
                                                label={type.name}
                                                size="small"
                                                sx={{
                                                    borderRadius: 1,
                                                    bgcolor: alpha(type.color, 0.1),
                                                    border: `1px solid ${alpha(type.color, 0.2)}`,
                                                    color: type.color,
                                                    fontWeight: 500,
                                                    '& .MuiChip-icon': { color: type.color },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* Code editor mockup */}
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            width: '100%',
                                            height: 360,
                                            backgroundColor: alpha(theme.palette.background.paper, 0.7),
                                            backdropFilter: 'blur(8px)',
                                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        <Box sx={{
                                            height: '36px',
                                            bgcolor: alpha(theme.palette.background.default, 0.6),
                                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            px: 2,
                                            gap: 1
                                        }}>
                                            <Box sx={{ width: 12, height: 12, bgcolor: '#ef4444', borderRadius: '50%' }} />
                                            <Box sx={{ width: 12, height: 12, bgcolor: '#f59e0b', borderRadius: '50%' }} />
                                            <Box sx={{ width: 12, height: 12, bgcolor: '#10b981', borderRadius: '50%' }} />
                                            <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary', fontSize: '0.75rem' }}>
                                                main.py
                                            </Typography>
                                        </Box>
                                        <Box sx={{ p: 2, fontFamily: 'monospace', color: theme.palette.primary.main }}>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                                                # Two Sum Problem
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#10b981', mb: 2 }}>
                                                def two_sum(nums, target):
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 4 }}>
                                                hash_map = { }
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 4, mt: 1 }}>
                                                for i, num in enumerate(nums):
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 8, mt: 1 }}>
                                                complement = target - num
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 8, mt: 1 }}>
                                                if complement in hash_map:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 12, mt: 1 }}>
                                                return [hash_map[complement], i]
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 8, mt: 1 }}>
                                                hash_map[num] = i
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, ml: 4, mt: 1 }}>
                                                return []
                                            </Typography>

                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 20,
                                                    right: 20,
                                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                                    color: theme.palette.success.main,
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                                                }}
                                            >
                                                All Tests Passed
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Features Section */}
                <Container maxWidth="lg" sx={{ py: 10 }}>
                    <Box sx={{ textAlign: 'center', mb: 8 }}>
                        <Chip
                            label="FEATURES"
                            sx={{
                                mb: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                borderRadius: 1,
                            }}
                        />
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{ fontWeight: 700, mb: 2 }}
                        >
                            Everything You Need to Excel
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ maxWidth: 650, mx: 'auto' }}
                        >
                            Our comprehensive platform offers specialized tools for every aspect of software engineering skill development
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 2,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 12px 20px ${alpha(theme.palette.common.black, 0.12)}`,
                                        },
                                        cursor: 'pointer',
                                        border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                                    }}
                                    onClick={feature.action}
                                    elevation={1}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box
                                            sx={{
                                                mb: 2.5,
                                                width: 56,
                                                height: 56,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 1,
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1.5 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Sandbox Environments Section */}
                <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), py: 10 }}>
                    <Container maxWidth="lg">
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <Chip
                                label="SANDBOX ENVIRONMENTS"
                                sx={{
                                    mb: 2,
                                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                    color: theme.palette.secondary.main,
                                    fontWeight: 600,
                                    borderRadius: 1,
                                }}
                            />
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{ fontWeight: 700, mb: 2 }}
                            >
                                Specialized Practice Environments
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                sx={{ maxWidth: 750, mx: 'auto' }}
                            >
                                Choose the right environment for your learning needs - from code editors to interactive system design tools
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    bgcolor: theme.palette.background.paper,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: 4,
                                        bgcolor: theme.palette.primary.main,
                                    }} />
                                    <Box sx={{ mb: 2 }}>
                                        <CodeIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                                    </Box>
                                    <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                                        Code Playground
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Write and test code in 15+ programming languages with our interactive editor. Features syntax highlighting, auto-completion, and real-time execution.
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                                        <Chip label="Python" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="JavaScript" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Java" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="C++" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Go" size="small" sx={{ borderRadius: 1 }} />
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    bgcolor: theme.palette.background.paper,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: 4,
                                        bgcolor: theme.palette.secondary.main,
                                    }} />
                                    <Box sx={{ mb: 2 }}>
                                        <DesignServicesIcon sx={{ fontSize: 36, color: theme.palette.secondary.main }} />
                                    </Box>
                                    <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                                        System Design Whiteboard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Create architecture diagrams with our intuitive whiteboard tool. Perfect for practicing system design interviews and documenting solutions.
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                                        <Chip label="UML" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Architecture" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Diagrams" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Flowcharts" size="small" sx={{ borderRadius: 1 }} />
                                    </Stack>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    bgcolor: theme.palette.background.paper,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: 4,
                                        bgcolor: theme.palette.success.main,
                                    }} />
                                    <Box sx={{ mb: 2 }}>
                                        <CloudIcon sx={{ fontSize: 36, color: theme.palette.success.main }} />
                                    </Box>
                                    <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                                        DevOps Simulator
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Practice CI/CD pipeline configuration, containerization, and cloud infrastructure setup in a safe, simulated environment.
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                                        <Chip label="Docker" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Kubernetes" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="Jenkins" size="small" sx={{ borderRadius: 1 }} />
                                        <Chip label="AWS" size="small" sx={{ borderRadius: 1 }} />
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate('/problems')}
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    fontWeight: 600,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                }}
                            >
                                Explore All Environments
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Testimonials Section */}
                <Container maxWidth="lg" sx={{ py: 10 }}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Chip
                            label="TESTIMONIALS"
                            sx={{
                                mb: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                borderRadius: 1,
                            }}
                        />
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{ fontWeight: 700, mb: 2 }}
                        >
                            What Developers Say
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography variant="body1" paragraph sx={{ flexGrow: 1, fontStyle: 'italic', mb: 3 }}>
                                        "{testimonial.text}"
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                                            {testimonial.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {testimonial.role}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ bgcolor: theme.palette.background.paper, py: 10 }}>
                <Container maxWidth="md">
                    <Paper
                        elevation={3}
                        sx={{
                            p: { xs: 4, md: 6 },
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.95)}, ${alpha(theme.palette.primary.main, 0.9)})`,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Abstract background elements */}
                        <Box sx={{
                            position: 'absolute',
                            top: -40,
                            right: -40,
                            width: 180,
                            height: 180,
                            borderRadius: '50%',
                            background: alpha('#ffffff', 0.05),
                            zIndex: 0
                        }} />
                        <Box sx={{
                            position: 'absolute',
                            bottom: -30,
                            left: -30,
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            background: alpha('#ffffff', 0.05),
                            zIndex: 0
                        }} />

                        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <Typography variant="h3" component="h2" gutterBottom fontWeight={700} color="white">
                                Start Your Learning Journey
                            </Typography>
                            <Typography variant="h6" paragraph sx={{ mb: 4, color: alpha('#ffffff', 0.9), fontWeight: 400 }}>
                                Join thousands of engineers improving their skills and advancing their careers
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate(isAuthenticated ? '/problems' : '/register')}
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: `0 8px 16px ${alpha('#000000', 0.3)}`,
                                }}
                            >
                                {isAuthenticated ? 'Explore Challenges' : 'Get Started Free'}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
