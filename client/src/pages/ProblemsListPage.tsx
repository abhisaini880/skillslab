import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { RootState } from '@/store';
import { fetchProblems, Problem, ProblemType, DifficultyLevel } from '@/store/slices/problemsSlice';
import {
    Container,
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField,
    InputAdornment,
    CircularProgress,
    Pagination,
    Paper,
    IconButton,
    Divider,
    useTheme,
    alpha,
    Avatar,
    Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ProblemsListPage = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { problems, isLoading, error } = useSelector((state: RootState) => state.problems);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>(searchParams.get('type') || '');
    const [difficultyFilter, setDifficultyFilter] = useState<string>(searchParams.get('difficulty') || '');
    const [page, setPage] = useState(1);
    const problemsPerPage = 10;
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchProblems());
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (typeFilter) params.set('type', typeFilter);
        if (difficultyFilter) params.set('difficulty', difficultyFilter);
        setSearchParams(params);
    }, [typeFilter, difficultyFilter, setSearchParams]);

    const handleTypeChange = (event: SelectChangeEvent) => {
        setTypeFilter(event.target.value);
        setPage(1);
    };

    const handleDifficultyChange = (event: SelectChangeEvent) => {
        setDifficultyFilter(event.target.value);
        setPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const getDifficultyColor = (difficulty: DifficultyLevel) => {
        switch (difficulty) {
            case DifficultyLevel.EASY:
                return 'success';
            case DifficultyLevel.MEDIUM:
                return 'warning';
            case DifficultyLevel.HARD:
                return 'error';
            default:
                return 'default';
        }
    };

    const getTypeIcon = (type: ProblemType) => {
        switch (type) {
            case ProblemType.DSA:
                return <CodeIcon />;
            case ProblemType.LLD:
                return <ArchitectureIcon />;
            case ProblemType.HLD:
                return <ArchitectureIcon sx={{ transform: 'scale(1.2)' }} />;
            case ProblemType.SQL:
                return <StorageIcon />;
            case ProblemType.DEVOPS:
                return <CloudIcon />;
            default:
                return <CodeIcon />;
        }
    };

    const getTypeLabel = (type: ProblemType) => {
        switch (type) {
            case ProblemType.DSA:
                return 'DSA';
            case ProblemType.LLD:
                return 'LLD';
            case ProblemType.HLD:
                return 'HLD';
            case ProblemType.SQL:
                return 'SQL';
            case ProblemType.DEVOPS:
                return 'DevOps';
            default:
                return type;
        }
    };

    // Filter problems based on search, type and difficulty
    const filteredProblems = Array.isArray(problems)
        ? problems.filter((problem) => {
            const matchesSearch = search
                ? problem.title.toLowerCase().includes(search.toLowerCase()) ||
                problem.description.toLowerCase().includes(search.toLowerCase())
                : true;

            const matchesType = typeFilter ? problem.type === typeFilter : true;
            const matchesDifficulty = difficultyFilter ? problem.difficulty === difficultyFilter : true;

            return matchesSearch && matchesType && matchesDifficulty;
        })
        : [];

    // Pagination
    const indexOfLastProblem = page * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

    const handleProblemClick = (problemId: string) => {
        navigate(`/problems/${problemId}`);
    };

    if (isLoading && (!Array.isArray(problems) || problems.length === 0)) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Paper sx={{ p: 4, mt: 4, borderRadius: 2, backgroundColor: alpha(theme.palette.error.light, 0.1) }}>
                    <Typography color="error" variant="h6" sx={{ textAlign: 'center' }}>
                        {error}
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="700" color="primary.main">
                        Coding Problems
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Improve your skills with our curated collection of problems
                    </Typography>
                </Box>

                {/* Search field always visible */}
                <Box sx={{ width: { xs: '100%', md: '40%' }, mt: { xs: 2, md: 0 } }}>
                    <TextField
                        fullWidth
                        placeholder="Search problems..."
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => setShowFilters(!showFilters)}
                                        color={showFilters || typeFilter || difficultyFilter ? 'primary' : 'default'}
                                    >
                                        <Badge
                                            color="primary"
                                            variant="dot"
                                            invisible={!typeFilter && !difficultyFilter}
                                        >
                                            <FilterListIcon />
                                        </Badge>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>

            {/* Filters - Collapsible */}
            {showFilters && (
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 4,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.primary.light, 0.03),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={5}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="problem-type-label">Problem Type</InputLabel>
                                <Select
                                    labelId="problem-type-label"
                                    id="problem-type-select"
                                    value={typeFilter}
                                    label="Problem Type"
                                    onChange={handleTypeChange}
                                >
                                    <MenuItem value="">All Types</MenuItem>
                                    <MenuItem value={ProblemType.DSA}>Data Structures & Algorithms</MenuItem>
                                    <MenuItem value={ProblemType.LLD}>Low-Level Design</MenuItem>
                                    <MenuItem value={ProblemType.HLD}>High-Level Design</MenuItem>
                                    <MenuItem value={ProblemType.SQL}>SQL</MenuItem>
                                    <MenuItem value={ProblemType.DEVOPS}>DevOps</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    id="difficulty-select"
                                    value={difficultyFilter}
                                    label="Difficulty"
                                    onChange={handleDifficultyChange}
                                >
                                    <MenuItem value="">All Levels</MenuItem>
                                    <MenuItem value={DifficultyLevel.EASY}>Easy</MenuItem>
                                    <MenuItem value={DifficultyLevel.MEDIUM}>Medium</MenuItem>
                                    <MenuItem value={DifficultyLevel.HARD}>Hard</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button
                                variant="outlined"
                                fullWidth
                                size="medium"
                                onClick={() => {
                                    setTypeFilter('');
                                    setDifficultyFilter('');
                                    setSearch('');
                                    setPage(1);
                                }}
                                sx={{ textTransform: 'none' }}
                            >
                                Clear All
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}

            {/* Problem count */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary">
                    Showing {filteredProblems.length} {filteredProblems.length === 1 ? 'problem' : 'problems'}
                </Typography>
            </Box>

            {/* Problem List */}
            {currentProblems.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                        {currentProblems.map((problem) => (
                            <Grid item xs={12} key={problem.id}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        cursor: 'pointer',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                                            transform: 'translateY(-2px)',
                                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                                        },
                                    }}
                                    onClick={() => handleProblemClick(problem.id)}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Box display="flex" alignItems="center" mb={1} gap={1}>
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                            color: theme.palette.primary.main,
                                                            width: 40,
                                                            height: 40
                                                        }}
                                                    >
                                                        {getTypeIcon(problem.type)}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" component="h2" fontWeight="600">
                                                            {problem.title}
                                                        </Typography>
                                                        <Box display="flex" gap={1}>
                                                            <Chip
                                                                label={getTypeLabel(problem.type)}
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{ fontWeight: 500 }}
                                                            />
                                                            <Chip
                                                                label={problem.difficulty}
                                                                size="small"
                                                                color={getDifficultyColor(problem.difficulty)}
                                                                sx={{ fontWeight: 500 }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 1,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {problem.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    endIcon={<ArrowForwardIcon />}
                                                    sx={{
                                                        borderRadius: 8,
                                                        textTransform: 'none',
                                                        fontWeight: 600
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleProblemClick(problem.id);
                                                    }}
                                                >
                                                    Solve Problem
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt={5}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: 1,
                                    }
                                }}
                            />
                        </Box>
                    )}
                </>
            ) : (
                <Paper
                    sx={{
                        textAlign: 'center',
                        py: 6,
                        px: 3,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.primary.light, 0.03),
                    }}
                >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No problems found matching your criteria.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, borderRadius: 8, textTransform: 'none', fontWeight: 600 }}
                        onClick={() => {
                            setTypeFilter('');
                            setDifficultyFilter('');
                            setSearch('');
                            setShowFilters(false);
                        }}
                    >
                        Clear All Filters
                    </Button>
                </Paper>
            )}
        </Container>
    );
};

export default ProblemsListPage;
