import { api } from './api';
import { Problem, ProblemType, DifficultyLevel } from '@/store/slices/problemsSlice';

export interface ProblemFilters {
    type?: ProblemType;
    difficulty?: DifficultyLevel;
    search?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
}

interface CreateProblemRequest {
    title: string;
    description: string;
    type: ProblemType;
    difficulty: DifficultyLevel;
    tags: string[];
    sampleTestCases?: string;
}

class ProblemService {
    /**
     * Get all problems with optional filters
     */
    async getProblems(filters?: ProblemFilters): Promise<Problem[]> {
        // Convert filters to query parameters
        const params: Record<string, string | number> = {};
        if (filters) {
            if (filters.type) params.type = filters.type;
            if (filters.difficulty) params.difficulty = filters.difficulty;
            if (filters.search) params.search = filters.search;
            if (filters.limit) params.limit = filters.limit;
            if (filters.offset) params.offset = filters.offset;
            // Convert tags array to comma-separated string
            if (filters.tags && filters.tags.length > 0) {
                params.tags = filters.tags.join(',');
            }
        }

        return await api.get<Problem[]>('/problems', { params });
    }

    /**
     * Get a problem by ID
     */
    async getProblemById(id: string): Promise<Problem> {
        return await api.get<Problem>(`/problems/${id}`);
    }

    /**
     * Create a new problem
     */
    async createProblem(problemData: CreateProblemRequest): Promise<Problem> {
        return await api.post<Problem>('/problems', problemData);
    }

    /**
     * Update a problem
     */
    async updateProblem(id: string, problemData: Partial<CreateProblemRequest>): Promise<Problem> {
        return await api.put<Problem>(`/problems/${id}`, problemData);
    }

    /**
     * Delete a problem
     */
    async deleteProblem(id: string): Promise<void> {
        return await api.delete<void>(`/problems/${id}`);
    }
}

export default new ProblemService();
