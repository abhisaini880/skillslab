import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Problem } from './problemsSlice';

export enum SubmissionStatus {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    ACCEPTED = 'ACCEPTED',
    WRONG_ANSWER = 'WRONG_ANSWER',
    RUNTIME_ERROR = 'RUNTIME_ERROR',
    TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
    COMPILATION_ERROR = 'COMPILATION_ERROR',
}

export interface Submission {
    id: string;
    userId: string;
    problemId: string;
    problem?: Problem;
    code: string;
    language: string;
    status: SubmissionStatus;
    runtime?: number;
    memory?: number;
    feedback?: string;
    createdAt: string;
    updatedAt: string;
}

interface SubmissionsState {
    submissions: Submission[];
    currentSubmission: Submission | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: SubmissionsState = {
    submissions: [],
    currentSubmission: null,
    isLoading: false,
    error: null,
};

// Async thunks
export const fetchUserSubmissions = createAsyncThunk(
    'submissions/fetchUserSubmissions',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('Authentication required');
            }

            const response = await axios.get('/api/v1/submissions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Failed to fetch submissions');
        }
    }
);

export const fetchSubmissionById = createAsyncThunk(
    'submissions/fetchSubmissionById',
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('Authentication required');
            }

            const response = await axios.get(`/api/v1/submissions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Failed to fetch submission');
        }
    }
);

export const createSubmission = createAsyncThunk(
    'submissions/createSubmission',
    async (submission: { problemId: string; code: string; language: string }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('Authentication required');
            }

            const response = await axios.post('/api/v1/submissions', submission, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || 'Failed to create submission');
        }
    }
);

const submissionsSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        clearCurrentSubmission: (state) => {
            state.currentSubmission = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch User Submissions
            .addCase(fetchUserSubmissions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserSubmissions.fulfilled, (state, action: PayloadAction<Submission[]>) => {
                state.isLoading = false;
                state.submissions = action.payload;
            })
            .addCase(fetchUserSubmissions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Fetch Submission by ID
            .addCase(fetchSubmissionById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSubmissionById.fulfilled, (state, action: PayloadAction<Submission>) => {
                state.isLoading = false;
                state.currentSubmission = action.payload;
            })
            .addCase(fetchSubmissionById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Create Submission
            .addCase(createSubmission.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSubmission.fulfilled, (state, action: PayloadAction<Submission>) => {
                state.isLoading = false;
                state.currentSubmission = action.payload;
                state.submissions = [action.payload, ...state.submissions];
            })
            .addCase(createSubmission.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrentSubmission, clearError } = submissionsSlice.actions;
export default submissionsSlice.reducer;
