import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
    Paper,
    Divider,
    IconButton,
    FormHelperText,
    alpha,
    useTheme,
    Snackbar,
    Alert,
    AlertColor,
    CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { RootState } from '@/store';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Editor } from '@monaco-editor/react';
import problemService, { TestCase as ApiTestCase, CreateProblemRequest } from '@/services/problemService';
import { Problem as StoreProblem, ProblemType, DifficultyLevel } from '@/store/slices/problemsSlice';

// Define problem difficulty types
const difficulties = [
    DifficultyLevel.EASY,
    DifficultyLevel.MEDIUM,
    DifficultyLevel.HARD
];

// Define problem types
const problemTypes = [
    ProblemType.DSA,
    ProblemType.LLD,
    ProblemType.HLD,
    ProblemType.SQL,
    ProblemType.DEVOPS
];

// Define problem categories
const categories = [
    'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs',
    'Dynamic Programming', 'Sorting', 'Greedy', 'Binary Search',
    'Hash Tables', 'Recursion', 'Backtracking', 'Math', 'OOP Design',
    'System Design', 'Database', 'LLD', 'HLD', 'DevOps'
];

// Define the test case interface
interface TestCase {
    input: string;
    output: string;
    explanation?: string;
}

// Define the problem interface
interface Problem {
    id?: string;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    type: ProblemType;
    tags: string[];
    category: string;
    constraints: string[];
    code_template: string;
    solution: string;
    test_cases: TestCase[];
    examples: TestCase[];
    time_limit_ms: number;
    memory_limit_mb: number;
}

const AdminProblemPage: React.FC = () => {
    const theme = useTheme();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Notification state
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: AlertColor;
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    // Problem state with initial empty values
    const [problem, setProblem] = useState<Problem>({
        title: '',
        description: '',
        difficulty: DifficultyLevel.MEDIUM,
        type: ProblemType.DSA,
        tags: [],
        category: 'Arrays',
        constraints: [''],
        code_template: '// Write your code template here\n\n',
        solution: '// Write your solution here\n\n',
        test_cases: [{ input: '', output: '' }],
        examples: [{ input: '', output: '', explanation: '' }],
        time_limit_ms: 1000,
        memory_limit_mb: 256
    });

    // Form validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // For tag input
    const [tagInput, setTagInput] = useState<string>('');

    // Check if we're editing an existing problem or creating a new one
    const isEditMode = Boolean(id);

    // Fetch problem data if in edit mode
    useEffect(() => {
        if (isEditMode && id) {
            const fetchProblem = async () => {
                try {
                    const response = await problemService.getProblemById(id);
                    setProblem({
                        id,
                        title: response.title,
                        description: response.description,
                        difficulty: response.difficulty,
                        type: response.type,
                        tags: response.tags || [],
                        category: response.category || 'Arrays',
                        constraints: response.constraints || [''],
                        code_template: response.code_template || '// Write your code template here\n\n',
                        solution: response.solution || '// Write your solution here\n\n',
                        test_cases: response.test_cases || [{ input: '', output: '' }],
                        examples: response.examples || [{ input: '', output: '', explanation: '' }],
                        time_limit_ms: response.time_limit_ms || 1000,
                        memory_limit_mb: response.memory_limit_mb || 256
                    });
                } catch (error) {
                    console.error('Error fetching problem:', error);
                    setNotification({
                        open: true,
                        message: 'Failed to load problem data',
                        severity: 'error'
                    });
                }
            };
            fetchProblem();
        }
    }, [id, isEditMode]);

    // Generic handle change function for simple fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProblem({
            ...problem,
            [name]: value
        });
        // Clear any errors for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Handle select change for dropdown fields
    const handleSelectChange = (e: any) => {
        const { name, value } = e.target;
        setProblem({
            ...problem,
            [name]: value
        });
    };

    // Handle code template changes
    const handleCodeTemplateChange = (value: string | undefined) => {
        if (value !== undefined) {
            setProblem({
                ...problem,
                code_template: value
            });
        }
    };

    // Handle solution code changes
    const handleSolutionChange = (value: string | undefined) => {
        if (value !== undefined) {
            setProblem({
                ...problem,
                solution: value
            });
        }
    };

    // Handle tag input
    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    // Add a tag
    const addTag = () => {
        if (tagInput && !problem.tags.includes(tagInput)) {
            setProblem({
                ...problem,
                tags: [...problem.tags, tagInput]
            });
            setTagInput('');
        }
    };

    // Remove a tag
    const removeTag = (tagToDelete: string) => {
        setProblem({
            ...problem,
            tags: problem.tags.filter(tag => tag !== tagToDelete)
        });
    };

    // Add constraint
    const addConstraint = () => {
        setProblem({
            ...problem,
            constraints: [...problem.constraints, '']
        });
    };

    // Update constraint
    const updateConstraint = (index: number, value: string) => {
        const updatedConstraints = [...problem.constraints];
        updatedConstraints[index] = value;
        setProblem({
            ...problem,
            constraints: updatedConstraints
        });
    };

    // Remove constraint
    const removeConstraint = (index: number) => {
        if (problem.constraints.length > 1) {
            const updatedConstraints = problem.constraints.filter((_, i) => i !== index);
            setProblem({
                ...problem,
                constraints: updatedConstraints
            });
        }
    };

    // Add example
    const addExample = () => {
        setProblem({
            ...problem,
            examples: [...problem.examples, { input: '', output: '', explanation: '' }]
        });
    };

    // Update example
    const updateExample = (index: number, field: keyof TestCase, value: string) => {
        const updatedExamples = [...problem.examples];
        updatedExamples[index] = {
            ...updatedExamples[index],
            [field]: value
        };
        setProblem({
            ...problem,
            examples: updatedExamples
        });
    };

    // Remove example
    const removeExample = (index: number) => {
        if (problem.examples.length > 1) {
            const updatedExamples = problem.examples.filter((_, i) => i !== index);
            setProblem({
                ...problem,
                examples: updatedExamples
            });
        }
    };

    // Add test case
    const addTestCase = () => {
        setProblem({
            ...problem,
            test_cases: [...problem.test_cases, { input: '', output: '' }]
        });
    };

    // Update test case
    const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
        const updatedTestCases = [...problem.test_cases];
        updatedTestCases[index] = {
            ...updatedTestCases[index],
            [field]: value
        };
        setProblem({
            ...problem,
            test_cases: updatedTestCases
        });
    };

    // Remove test case
    const removeTestCase = (index: number) => {
        if (problem.test_cases.length > 1) {
            const updatedTestCases = problem.test_cases.filter((_, i) => i !== index);
            setProblem({
                ...problem,
                test_cases: updatedTestCases
            });
        }
    };

    // Validate the form
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!problem.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!problem.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (problem.tags.length === 0) {
            newErrors.tags = 'At least one tag is required';
        }
        if (problem.examples.some(ex => !ex.input.trim() || !ex.output.trim())) {
            newErrors.examples = 'All examples must have input and output values';
        }
        if (problem.test_cases.some(tc => !tc.input.trim() || !tc.output.trim())) {
            newErrors.testCases = 'All test cases must have input and output values';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Convert the internal problem model to API request format
    const prepareProblemData = (): CreateProblemRequest => {
        return {
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            type: problem.type,
            category: problem.category,
            tags: problem.tags,
            constraints: problem.constraints.filter(c => c.trim() !== ''), // Filter empty constraints
            code_template: problem.code_template,
            solution: problem.solution,
            examples: problem.examples as ApiTestCase[],
            test_cases: problem.test_cases as ApiTestCase[],
            time_limit_ms: problem.time_limit_ms,
            memory_limit_mb: problem.memory_limit_mb
        };
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            setNotification({
                open: true,
                message: 'Please fix the errors before submitting',
                severity: 'error'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const problemData = prepareProblemData();

            if (isEditMode && id) {
                await problemService.updateProblem(id, problemData);
                setNotification({
                    open: true,
                    message: 'Problem updated successfully!',
                    severity: 'success'
                });
            } else {
                await problemService.createProblem(problemData);
                setNotification({
                    open: true,
                    message: 'Problem created successfully!',
                    severity: 'success'
                });
            }

            // Navigate back to problems list after a short delay
            setTimeout(() => {
                navigate('/admin/problems');
            }, 1500);
        } catch (error: any) {
            console.error('Error saving problem:', error);
            setNotification({
                open: true,
                message: error.response?.data?.detail || 'Failed to save problem',
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle notification close
    const handleNotificationClose = () => {
        setNotification({
            ...notification,
            open: false
        });
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 12, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton
                        onClick={() => navigate('/admin/problems')}
                        sx={{ mr: 2 }}
                        color="inherit"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            color: 'transparent',
                            display: 'inline-block'
                        }}
                    >
                        {isEditMode ? 'Edit Problem' : 'Create New Problem'}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                    {isEditMode
                        ? 'Update the problem details, test cases, and solution'
                        : 'Define a new programming challenge for users to solve'
                    }
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Paper
                    elevation={1}
                    sx={{
                        p: { xs: 2, md: 4 },
                        mb: 4,
                        borderRadius: theme.shape.borderRadius,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                        Problem Details
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Title */}
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Problem Title"
                                name="title"
                                value={problem.title}
                                onChange={handleChange}
                                variant="outlined"
                                error={Boolean(errors.title)}
                                helperText={errors.title}
                                required
                            />
                        </Grid>
                        {/* Difficulty */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    name="difficulty"
                                    value={problem.difficulty}
                                    onChange={handleSelectChange}
                                    label="Difficulty"
                                >
                                    {difficulties.map((diff) => (
                                        <MenuItem key={diff} value={diff}>
                                            {diff}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Problem Type */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="type-label">Problem Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    name="type"
                                    value={problem.type}
                                    onChange={handleSelectChange}
                                    label="Problem Type"
                                >
                                    {problemTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Category */}
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={problem.category}
                                    onChange={handleSelectChange}
                                    label="Category"
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Tags */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ mb: 1 }}>
                                <FormControl fullWidth error={Boolean(errors.tags)}>
                                    <TextField
                                        label="Add Tags"
                                        value={tagInput}
                                        onChange={handleTagInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    onClick={addTag}
                                                    disabled={!tagInput || problem.tags.includes(tagInput)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            ),
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                    />
                                    {errors.tags && <FormHelperText>{errors.tags}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {problem.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        onDelete={() => removeTag(tag)}
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </Box>
                        </Grid>
                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Problem Description"
                                name="description"
                                value={problem.description}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={6}
                                error={Boolean(errors.description)}
                                helperText={errors.description}
                                required
                            />
                        </Grid>
                        {/* Time Limit */}
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Time Limit (ms)"
                                name="time_limit_ms"
                                value={problem.time_limit_ms}
                                onChange={handleChange}
                                variant="outlined"
                                InputProps={{ inputProps: { min: 100, step: 100 } }}
                            />
                        </Grid>
                        {/* Memory Limit */}
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Memory Limit (MB)"
                                name="memory_limit_mb"
                                value={problem.memory_limit_mb}
                                onChange={handleChange}
                                variant="outlined"
                                InputProps={{ inputProps: { min: 16, step: 16 } }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                {/* Constraints */}
                <Paper
                    elevation={1}
                    sx={{
                        p: { xs: 2, md: 4 },
                        mb: 4,
                        borderRadius: theme.shape.borderRadius,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight={600}>
                            Constraints
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addConstraint}
                            variant="outlined"
                        >
                            Add Constraint
                        </Button>
                    </Box>
                    {problem.constraints.map((constraint, index) => (
                        <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                            <TextField
                                fullWidth
                                label={`Constraint ${index + 1}`}
                                value={constraint}
                                onChange={(e) => updateConstraint(index, e.target.value)}
                                variant="outlined"
                            />
                            <IconButton
                                onClick={() => removeConstraint(index)}
                                disabled={problem.constraints.length <= 1}
                                sx={{ ml: 1 }}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Paper>
                {/* Examples */}
                <Paper
                    elevation={1}
                    sx={{
                        p: { xs: 2, md: 4 },
                        mb: 4,
                        borderRadius: theme.shape.borderRadius,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight={600}>
                            Examples
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addExample}
                            variant="outlined"
                        >
                            Add Example
                        </Button>
                    </Box>
                    {Boolean(errors.examples) && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.examples}
                        </Alert>
                    )}
                    {problem.examples.map((example, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 3,
                                mb: 3,
                                position: 'relative',
                                borderRadius: 2,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: alpha(theme.palette.background.default, 0.3)
                            }}
                            variant="outlined"
                        >
                            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                                <IconButton
                                    onClick={() => removeExample(index)}
                                    disabled={problem.examples.length <= 1}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Example {index + 1}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Input"
                                        value={example.input}
                                        onChange={(e) => updateExample(index, 'input', e.target.value)}
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Output"
                                        value={example.output}
                                        onChange={(e) => updateExample(index, 'output', e.target.value)}
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Explanation (Optional)"
                                        value={example.explanation || ''}
                                        onChange={(e) => updateExample(index, 'explanation', e.target.value)}
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Paper>
                {/* Test Cases */}
                <Paper
                    elevation={1}
                    sx={{
                        p: { xs: 2, md: 4 },
                        mb: 4,
                        borderRadius: theme.shape.borderRadius,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" fontWeight={600}>
                            Test Cases
                        </Typography>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addTestCase}
                            variant="outlined"
                        >
                            Add Test Case
                        </Button>
                    </Box>
                    {Boolean(errors.testCases) && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.testCases}
                        </Alert>
                    )}
                    {problem.test_cases.map((testCase, index) => (
                        <Paper
                            key={index}
                            sx={{
                                p: 3,
                                mb: 3,
                                position: 'relative',
                                borderRadius: 2,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: alpha(theme.palette.background.default, 0.3)
                            }}
                            variant="outlined"
                        >
                            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                                <IconButton
                                    onClick={() => removeTestCase(index)}
                                    disabled={problem.test_cases.length <= 1}
                                    color="error"
                                    size="small"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Test Case {index + 1}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Input"
                                        value={testCase.input}
                                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Expected Output"
                                        value={testCase.output}
                                        onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Paper>
                {/* Code Template & Solution */}
                <Paper
                    elevation={1}
                    sx={{
                        p: { xs: 2, md: 4 },
                        mb: 4,
                        borderRadius: theme.shape.borderRadius,
                        background: alpha(theme.palette.background.paper, 0.6),
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                        Code Template & Solution
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                                Code Template (Starter Code)
                            </Typography>
                            <Paper sx={{ height: 300, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <Editor
                                    height="300px"
                                    defaultLanguage="javascript"
                                    value={problem.code_template}
                                    onChange={handleCodeTemplateChange}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        fontSize: 14,
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                                Solution Code
                            </Typography>
                            <Paper sx={{ height: 400, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <Editor
                                    height="400px"
                                    defaultLanguage="javascript"
                                    value={problem.solution}
                                    onChange={handleSolutionChange}
                                    theme="vs-dark"
                                    options={{
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        fontSize: 14,
                                    }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
                {/* Submit buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/admin/problems')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                            px: 4,
                            backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        }}
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            isEditMode ? 'Update Problem' : 'Create Problem'
                        )}
                    </Button>
                </Box>
            </form>
            {/* Notification */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
            >
                <Alert
                    onClose={handleNotificationClose}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AdminProblemPage;