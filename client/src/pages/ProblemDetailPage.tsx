import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Box, 
    Typography, 
    Chip, 
    Paper, 
    Grid, 
    Button, 
    CircularProgress, 
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent
} from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchProblemById } from '@/store/slices/problemsSlice';
import { Editor } from '@monaco-editor/react';
import { createSubmission } from '@/store/slices/submissionsSlice'; // Fixed import

// Define available programming languages
interface ProgrammingLanguage {
    id: string;
    name: string;
    monacoId: string;
    defaultTemplate: string;
}

const languages: ProgrammingLanguage[] = [
    { 
        id: 'javascript', 
        name: 'JavaScript', 
        monacoId: 'javascript',
        defaultTemplate: '// Write your JavaScript solution here\n\nfunction solution(input) {\n  // Your code here\n  return result;\n}\n'
    },
    { 
        id: 'python', 
        name: 'Python', 
        monacoId: 'python',
        defaultTemplate: '# Write your Python solution here\n\ndef solution(input):\n    # Your code here\n    return result\n'
    },
    { 
        id: 'java', 
        name: 'Java', 
        monacoId: 'java',
        defaultTemplate: '// Write your Java solution here\n\npublic class Solution {\n  public static void main(String[] args) {\n    // For testing\n  }\n\n  public static Object solution(Object input) {\n    // Your code here\n    return null;\n  }\n}\n'
    },
    { 
        id: 'cpp', 
        name: 'C++', 
        monacoId: 'cpp',
        defaultTemplate: '// Write your C++ solution here\n\n#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    // Your code here\n};\n\nint main() {\n    // For testing\n    return 0;\n}\n'
    }
];

const ProblemDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [code, setCode] = useState<string>(languages[0].defaultTemplate);
    const [language, setLanguage] = useState<string>(languages[0].id);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { currentProblem, loading, error } = useSelector((state: any) => state.problems);

    useEffect(() => {
        if (id) {
            dispatch(fetchProblemById(id));
        }
    }, [dispatch, id]);

    const handleLanguageChange = (event: SelectChangeEvent) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        
        // Set template for the new language
        const selectedLang = languages.find(lang => lang.id === newLanguage);
        if (selectedLang) {
            setCode(selectedLang.defaultTemplate);
        }
    };

    const handleCodeChange = (value: string | undefined) => {
        if (value !== undefined) {
            setCode(value);
        }
    };

    const handleSubmit = async () => {
        if (!id || !code.trim()) return;

        setIsSubmitting(true);
        try {
            await dispatch(createSubmission({ // Updated to use createSubmission instead of submitSolution
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

    // Get the Monaco language ID based on selected language
    const getMonacoLanguage = () => {
        const selectedLang = languages.find(lang => lang.id === language);
        return selectedLang ? selectedLang.monacoId : 'javascript';
    };

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
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Language selector */}
                                <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
                                    <InputLabel id="language-select-label">Language</InputLabel>
                                    <Select
                                        labelId="language-select-label"
                                        id="language-select"
                                        value={language}
                                        label="Language"
                                        onChange={handleLanguageChange}
                                    >
                                        {languages.map((lang) => (
                                            <MenuItem key={lang.id} value={lang.id}>
                                                {lang.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                language={getMonacoLanguage()}
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