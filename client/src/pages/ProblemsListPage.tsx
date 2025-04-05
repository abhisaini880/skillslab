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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ProblemsListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { problems, isLoading, error } = useSelector((state: RootState) => state.problems);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>(searchParams.get('type') || '');
    const [difficultyFilter, setDifficultyFilter] = useState<string>(searchParams.get('difficulty') || '');
    const [page, setPage] = useState(1);
    const problemsPerPage = 10;

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
    const filteredProblems = problems.filter((problem) => {
        const matchesSearch = search
            ? problem.title.toLowerCase().includes(search.toLowerCase()) ||
            problem.description.toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesType = typeFilter ? problem.type === typeFilter : true;
        const matchesDifficulty = difficultyFilter ? problem.difficulty === difficultyFilter : true;

        return matchesSearch && matchesType && matchesDifficulty;
    });

    // Pagination
    const indexOfLastProblem = page * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

    const handleProblemClick = (problemId: string) => {
        navigate(`/problems/${problemId}`);
    };

    if (isLoading && problems.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Coding Problems
            </Typography>

            {/* Filters */}
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Search problems"
                            variant="outlined"
                            value={search}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
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
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
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
                            onClick={() => {
                                setTypeFilter('');
                                setDifficultyFilter('');
                                setSearch('');
                                setPage(1);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Problem count */}
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Showing {filteredProblems.length} {filteredProblems.length === 1 ? 'problem' : 'problems'}
            </Typography>

            {/* Problem List */}
            {currentProblems.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                        {currentProblems.map((problem) => (
                            <Grid item xs={12} key={problem.id}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { boxShadow: 6 },
                                        transition: 'box-shadow 0.3s ease-in-out',
                                    }}
                                    onClick={() => handleProblemClick(problem.id)}
                                >
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                            <Box>
                                                <Typography variant="h6" component="h2" gutterBottom>
                                                    {problem.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {problem.description}
                                                </Typography>
                                            </Box>
                                            <Box display="flex" gap={1}>
                                                <Chip
                                                    label={getTypeLabel(problem.type)}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={problem.difficulty}
                                                    size="small"
                                                    color={getDifficultyColor(problem.difficulty)}
                                                />
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    )}
                </>
            ) : (
                <Box textAlign="center" py={6}>
                    <Typography variant="h6" color="text.secondary">
                        No problems found matching your criteria.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => {
                            setTypeFilter('');
                            setDifficultyFilter('');
                            setSearch('');
                        }}
                    >
                        Clear Filters
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default ProblemsListPage;