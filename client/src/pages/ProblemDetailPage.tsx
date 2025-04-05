import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Paper, Grid, Button, CircularProgress, Divider } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchProblemById } from '@/store/slices/problemsSlice';
import { Editor } from '@monaco-editor/react';
import { submitSolution } from '@/store/slices/submissionsSlice';

const ProblemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [code, setCode] = useState<string>('// Write your solution here\n\n');
    const [language, setLanguage] = useState<string>('javascript');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { currentProblem, loading, error } = useSelector((state: any) => state.problems);

    useEffect(() => {
        if (id) {
            dispatch(fetchProblemById(id));
        }
    }, [dispatch, id]);

    const handleCodeChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    const handleSubmit = async () => {
        if (!id || !code.trim()) return;

        setIsSubmitting(true);
        try {
            await dispatch(submitSolution({
                problemId: id,
                code,
                language
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={3}>
                <Typography color="error">Error loading problem: {error}</Typography>
            </Box>
        );
    }

    if (!currentProblem) {
        return (
            <Box p={3}>
                <Typography>Problem not found</Typography>
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Grid container spacing={3}>
                {/* Problem Details */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h4" gutterBottom>
                            {currentProblem.title}
                        </Typography>

                        <Box display="flex" gap={1} mb={2}>
                            <Chip
                                label={currentProblem.difficulty}
                                color={
                                    currentProblem.difficulty === 'Easy' ? 'success' :
                                        currentProblem.difficulty === 'Medium' ? 'warning' : 'error'
                                }
                            />
                            {currentProblem.tags?.map((tag: string) => (
                                <Chip key={tag} label={tag} variant="outlined" />
                            ))}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>Description</Typography>
                        <Typography paragraph>
                            {currentProblem.description}
                        </Typography>

                        {currentProblem.examples && (
                            <>
                                <Typography variant="h6" gutterBottom>Examples</Typography>
                                {currentProblem.examples.map((example: any, index: number) => (
                                    <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                                        <Typography variant="subtitle2">Input: {example.input}</Typography>
                                        <Typography variant="subtitle2">Output: {example.output}</Typography>
                                        {example.explanation && (
                                            <Typography variant="body2">Explanation: {example.explanation}</Typography>
                                        )}
                                    </Paper>
                                ))}
                            </>
                        )}

                        <Divider sx={{ my: 2 }} />

                        {currentProblem.constraints && (
                            <>
                                <Typography variant="h6" gutterBottom>Constraints</Typography>
                                <ul>
                                    {currentProblem.constraints.map((constraint: string, index: number) => (
                                        <li key={index}>
                                            <Typography>{constraint}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Paper>
                </Grid>

                {/* Code Editor */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={2} sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Solution</Typography>
                            <Box>
                                {/* Language selector can be added here */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    sx={{ ml: 1 }}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                            <Editor
                                height="70vh"
                                defaultLanguage="javascript"
                                language={language}
                                value={code}
                                onChange={handleCodeChange}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    padding: { top: 10 },
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProblemDetailPage;