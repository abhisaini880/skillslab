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

export interface TestCase {
    input: string;
    output: string;
    explanation?: string;
}

export interface CreateProblemRequest {
    title: string;
    description: string;
    type: ProblemType;
    difficulty: DifficultyLevel;
    category?: string;
    tags: string[];
    constraints?: string[];
    code_template?: string;
    solution?: string;
    examples: TestCase[];
    test_cases: TestCase[];
    time_limit_ms?: number;
    memory_limit_mb?: number;
}

// Add interface for paginated response
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
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
        
        // Our axios interceptor already extracts response.data,
        // so this is the paginated response directly
        const response = await api.get<PaginatedResponse<Problem>>('/problems', { params });
        
        // Return the items array from the paginated response
        return response.items || [];
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
        // Map the frontend field 'type' to backend field 'problem_type'
        // and ensure difficulty and problem_type are lowercase
        const apiRequestData = {
            ...problemData,
            problem_type: problemData.type.toLowerCase(), // Convert to lowercase
            difficulty: problemData.difficulty.toLowerCase(),
        };
        
        // Remove the 'type' field as we're using problem_type now
        delete (apiRequestData as any).type;
        
        return await api.post<Problem>('/problems', apiRequestData);
    }

    /**
     * Update a problem
     */
    async updateProblem(id: string, problemData: Partial<CreateProblemRequest>): Promise<Problem> {
        // Map the frontend field 'type' to backend field 'problem_type'
        // and ensure difficulty and problem_type are lowercase
        const apiRequestData: any = { ...problemData };
        
        if (problemData.type) {
            apiRequestData.problem_type = problemData.type.toLowerCase(); // Convert to lowercase
            delete apiRequestData.type;
        }
        
        if (problemData.difficulty) {
            apiRequestData.difficulty = problemData.difficulty.toLowerCase();
        }
        
        return await api.put<Problem>(`/problems/${id}`, apiRequestData);
    }

    /**
     * Delete a problem
     */
    async deleteProblem(id: string): Promise<void> {
        return await api.delete<void>(`/problems/${id}`);
    }
}

export default new ProblemService();
