import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import problemService, { ProblemFilters } from '@/services/problemService';

export enum ProblemType {
    DSA = 'DSA',
    LLD = 'LLD',
    HLD = 'HLD',
    SQL = 'SQL',
    DEVOPS = 'DEVOPS',
}

export enum DifficultyLevel {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

// Interface for the problems as received from the backend
export interface BackendProblem {
    id: string;
    title: string;
    description: string;
    problem_type: string;  // Lowercase in backend
    difficulty: string;    // Lowercase in backend
    problem_metadata: any;
    company_id: number | null;
    created_at: string;
    updated_at: string | null;
}

// Interface for problems used in the frontend
export interface Problem {
    id: string;
    title: string;
    description: string;
    type: ProblemType;
    difficulty: DifficultyLevel;
    tags: string[];
    isLive: boolean;
    createdAt: string;
    updatedAt: string;
    companyId?: string;
    sampleTestCases?: string;
}

interface ProblemsState {
    problems: Problem[];
    currentProblem: Problem | null;
    isLoading: boolean;
    error: string | null;
    filters: {
        type: ProblemType | null;
        difficulty: DifficultyLevel | null;
        tag: string | null;
        search: string;
    };
}

const initialState: ProblemsState = {
    problems: [],
    currentProblem: null,
    isLoading: false,
    error: null,
    filters: {
        type: null,
        difficulty: null,
        tag: null,
        search: '',
    },
};

// Helper function to transform backend problem to frontend format
const transformProblem = (backendProblem: any): Problem => {
    // Map from backend (problem_type, lowercase) to frontend (type, uppercase) format
    const problemType = backendProblem.problem_type?.toUpperCase() as ProblemType || ProblemType.DSA;
    const difficulty = backendProblem.difficulty?.toUpperCase() as DifficultyLevel || DifficultyLevel.MEDIUM;
    
    // Extract tags from problem_metadata if available
    const tags = backendProblem.problem_metadata?.tags || [];
    
    return {
        id: backendProblem.id.toString(),
        title: backendProblem.title || '',
        description: backendProblem.description || '',
        type: problemType,
        difficulty: difficulty,
        tags: tags,
        isLive: true, // Default value or from metadata
        createdAt: backendProblem.created_at || new Date().toISOString(),
        updatedAt: backendProblem.updated_at || new Date().toISOString(),
        companyId: backendProblem.company_id?.toString(),
        sampleTestCases: backendProblem.problem_metadata?.sampleTestCases || '',
    };
};

// Async thunks
export const fetchProblems = createAsyncThunk(
    'problems/fetchProblems',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { problems } = getState() as { problems: ProblemsState };
            const { type, difficulty, tag, search } = problems.filters;
            const filters: ProblemFilters = {};
            if (type) filters.type = type;
            if (difficulty) filters.difficulty = difficulty;
            if (search) filters.search = search;
            
            // Get problems from API
            const backendProblems = await problemService.getProblems(filters);
            
            // Transform backend problems to frontend format
            return backendProblems.map(transformProblem);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Failed to fetch problems');
        }
    }
);

export const fetchProblemById = createAsyncThunk(
    'problems/fetchProblemById',
    async (id: string, { rejectWithValue }) => {
        try {
            const backendProblem = await problemService.getProblemById(id);
            return transformProblem(backendProblem);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Failed to fetch problem');
        }
    }
);

const problemsSlice = createSlice({
    name: 'problems',
    initialState,
    reducers: {
        setTypeFilter: (state, action: PayloadAction<ProblemType | null>) => {
            state.filters.type = action.payload;
        },
        setDifficultyFilter: (state, action: PayloadAction<DifficultyLevel | null>) => {
            state.filters.difficulty = action.payload;
        },
        setTagFilter: (state, action: PayloadAction<string | null>) => {
            state.filters.tag = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                type: null,
                difficulty: null,
                tag: null,
                search: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Problems
            .addCase(fetchProblems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProblems.fulfilled, (state, action: PayloadAction<Problem[]>) => {
                state.isLoading = false;
                state.problems = action.payload;
            })
            .addCase(fetchProblems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch Problem by ID
            .addCase(fetchProblemById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProblemById.fulfilled, (state, action: PayloadAction<Problem>) => {
                state.isLoading = false;
                state.currentProblem = action.payload;
            })
            .addCase(fetchProblemById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setTypeFilter,
    setDifficultyFilter,
    setTagFilter,
    setSearchQuery,
    clearFilters
} = problemsSlice.actions;

export default problemsSlice.reducer;
