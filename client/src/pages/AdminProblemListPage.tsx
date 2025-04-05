import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    alpha,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Mock data for problems
const mockProblems = [
    {
        id: '1',
        title: 'Two Sum',
        difficulty: 'Easy',
        category: 'Arrays',
        tags: ['Array', 'Hash Table'],
        solved_count: 1245,
        created_at: '2023-05-10T10:30:00Z'
    },
    {
        id: '2',
        title: 'Add Two Numbers',
        difficulty: 'Medium',
        category: 'Linked Lists',
        tags: ['Linked List', 'Math'],
        solved_count: 986,
        created_at: '2023-05-12T14:20:00Z'
    },
    {
        id: '3',
        title: 'LRU Cache',
        difficulty: 'Medium',
        category: 'Design',
        tags: ['Hash Table', 'Linked List', 'Design'],
        solved_count: 742,
        created_at: '2023-05-15T09:45:00Z'
    },
    {
        id: '4',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        category: 'Arrays',
        tags: ['Array', 'Binary Search', 'Divide and Conquer'],
        solved_count: 523,
        created_at: '2023-05-18T16:30:00Z'
    },
    {
        id: '5',
        title: 'Regular Expression Matching',
        difficulty: 'Hard',
        category: 'Strings',
        tags: ['String', 'Dynamic Programming', 'Recursion'],
        solved_count: 412,
        created_at: '2023-05-20T11:15:00Z'
    },
    {
        id: '6',
        title: 'Binary Tree Inorder Traversal',
        difficulty: 'Easy',
        category: 'Trees',
        tags: ['Tree', 'Stack', 'DFS'],
        solved_count: 1098,
        created_at: '2023-05-22T13:40:00Z'
    },
    {
        id: '7',
        title: 'Word Ladder',
        difficulty: 'Hard',
        category: 'Graphs',
        tags: ['Graph', 'BFS'],
        solved_count: 367,
        created_at: '2023-05-25T15:20:00Z'
    },
    {
        id: '8',
        title: 'Design Twitter',
        difficulty: 'Medium',
        category: 'System Design',
        tags: ['Hash Table', 'Design', 'Heap'],
        solved_count: 631,
        created_at: '2023-05-28T09:10:00Z'
    },
    {
        id: '9',
        title: 'Merge k Sorted Lists',
        difficulty: 'Hard',
        category: 'Linked Lists',
        tags: ['Linked List', 'Divide and Conquer', 'Heap'],
        solved_count: 489,
        created_at: '2023-05-30T12:25:00Z'
    },
    {
        id: '10',
        title: 'Course Schedule',
        difficulty: 'Medium',
        category: 'Graphs',
        tags: ['Graph', 'DFS', 'BFS', 'Topological Sort'],
        solved_count: 817,
        created_at: '2023-06-02T14:50:00Z'
    }
];

// Define problem difficulty types
const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

// Define problem categories
const categories = [
    'All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs',
    'Dynamic Programming', 'Sorting', 'Greedy', 'Binary Search',
    'Hash Tables', 'Recursion', 'Backtracking', 'Math', 'OOP Design',
    'System Design', 'Database', 'LLD', 'HLD', 'DevOps'
];

// Define the interface for problem data
interface Problem {
    id: string;
    title: string;
    difficulty: string;
    category: string;
    tags: string[];
    solved_count: number;
    created_at: string;
}

// Define column types for the table
interface Column {
    id: 'id' | 'title' | 'difficulty' | 'category' | 'tags' | 'solved_count' | 'created_at' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'title', label: 'Problem Title', minWidth: 200 },
    { id: 'difficulty', label: 'Difficulty', minWidth: 100, align: 'center' },
    { id: 'category', label: 'Category', minWidth: 120 },
    { id: 'tags', label: 'Tags', minWidth: 170 },
    { id: 'solved_count', label: 'Solved', minWidth: 80, align: 'right' },
    { id: 'created_at', label: 'Created', minWidth: 120 },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
];

const AdminProblemListPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    // State for problems data and pagination
    const [problems, setProblems] = useState<Problem[]>(mockProblems);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // State for filtering
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // State for delete confirmation
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [problemToDelete, setProblemToDelete] = useState<string | null>(null);

    // Function to get all problems
    const fetchProblems = async () => {
        try {
            // In a real app, this would be an API call:
            // const response = await problemService.getAllProblems();
            // setProblems(response.data);

            // For demo, we'll use the mock data
            setProblems(mockProblems);
        } catch (error) {
            console.error('Error fetching problems:', error);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    // Apply filters
    const filteredProblems = problems.filter((problem) => {
        const matchesSearch = searchQuery === '' ||
            problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
        const matchesCategory = categoryFilter === 'All' || problem.category === categoryFilter;

        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Handlers for pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Handler for search input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    // Handler for difficulty filter
    const handleDifficultyChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDifficultyFilter(event.target.value as string);
        setPage(0);
    };

    // Handler for category filter
    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategoryFilter(event.target.value as string);
        setPage(0);
    };

    // Navigate to add new problem
    const handleAddProblem = () => {
        navigate('/admin/problems/new');
    };

    // Navigate to edit problem
    const handleEditProblem = (id: string) => {
        navigate(`/admin/problems/edit/${id}`);
    };

    // Open delete confirmation dialog
    const handleDeleteClick = (id: string) => {
        setProblemToDelete(id);
        setDeleteDialogOpen(true);
    };

    // Close delete confirmation dialog
    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setProblemToDelete(null);
    };

    // Delete problem
    const handleDeleteConfirm = async () => {
        if (problemToDelete) {
            try {
                // In a real app, this would be an API call:
                // await problemService.deleteProblem(problemToDelete);

                // For demo, we'll just filter the problem out
                setProblems(problems.filter(problem => problem.id !== problemToDelete));

                // Close the dialog
                handleCloseDeleteDialog();
            } catch (error) {
                console.error('Error deleting problem:', error);
            }
        }
    };

    // Format the created date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get color for difficulty chip
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return theme.palette.success.main;
            case 'Medium':
                return theme.palette.warning.main;
            case 'Hard':
                return theme.palette.error.main;
            case 'Expert':
                return theme.palette.error.dark;
            default:
                return theme.palette.primary.main;
        }
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
                    Problem Management
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                    Create, edit, and manage programming challenges on the platform
                </Typography>
            </Box>

            {/* Filters and actions */}
            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: theme.shape.borderRadius,
                    background: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
                    {/* Search field */}
                    <TextField
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="outlined"
                        size="small"
                        sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 220 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Filters */}
                    <FormControl size="small" sx={{ minWidth: 120, flexShrink: 0 }}>
                        <InputLabel id="difficulty-filter-label">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty-filter-label"
                            value={difficultyFilter}
                            onChange={handleDifficultyChange as any}
                            label="Difficulty"
                        >
                            {difficulties.map((difficulty) => (
                                <MenuItem key={difficulty} value={difficulty}>
                                    {difficulty}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120, flexShrink: 0 }}>
                        <InputLabel id="category-filter-label">Category</InputLabel>
                        <Select
                            labelId="category-filter-label"
                            value={categoryFilter}
                            onChange={handleCategoryChange as any}
                            label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Add Problem button */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddProblem}
                        sx={{
                            ml: { xs: 0, md: 'auto' },
                            backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        }}
                    >
                        Add Problem
                    </Button>
                </Box>
            </Paper>

            {/* Problems table */}
            <Paper
                elevation={1}
                sx={{
                    borderRadius: theme.shape.borderRadius,
                    overflow: 'hidden',
                    background: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(10px)',
                }}
            >
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        sx={{
                                            fontWeight: 600,
                                            backgroundColor: alpha(theme.palette.background.paper, 0.8),
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProblems
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((problem) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={problem.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.05)
                                            },
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleEditProblem(problem.id)}
                                    >
                                        {/* ID */}
                                        <TableCell>{problem.id}</TableCell>

                                        {/* Title */}
                                        <TableCell>
                                            <Typography variant="body1" fontWeight={500}>
                                                {problem.title}
                                            </Typography>
                                        </TableCell>

                                        {/* Difficulty */}
                                        <TableCell align="center">
                                            <Chip
                                                label={problem.difficulty}
                                                size="small"
                                                sx={{
                                                    backgroundColor: alpha(getDifficultyColor(problem.difficulty), 0.1),
                                                    color: getDifficultyColor(problem.difficulty),
                                                    fontWeight: 600,
                                                    borderRadius: '4px',
                                                    border: `1px solid ${alpha(getDifficultyColor(problem.difficulty), 0.2)}`,
                                                }}
                                            />
                                        </TableCell>

                                        {/* Category */}
                                        <TableCell>{problem.category}</TableCell>

                                        {/* Tags */}
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {problem.tags.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            fontSize: '0.7rem',
                                                            height: '22px'
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </TableCell>

                                        {/* Solved Count */}
                                        <TableCell align="right">{problem.solved_count.toLocaleString()}</TableCell>

                                        {/* Created Date */}
                                        <TableCell>{formatDate(problem.created_at)}</TableCell>

                                        {/* Actions */}
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditProblem(problem.id);
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>

                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(problem.id);
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filteredProblems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Delete confirmation dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Problem
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this problem? This action cannot be undone, and all associated submissions will be lost.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminProblemListPage;