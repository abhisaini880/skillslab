import { api } from './api';

// User interfaces
export interface IUser {
    id: string;
    username: string;
    email: string;
    full_name?: string;
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    full_name?: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

class AuthService {
    /**
     * Login user and store token
     */
    async login(credentials: LoginRequest): Promise<TokenResponse> {
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        const response = await api.post<TokenResponse>('/auth/login/access-token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.access_token) {
            localStorage.setItem('token', response.access_token);
        }

        return response;
    }

    /**
     * Register new user
     */
    async register(userData: RegisterRequest): Promise<IUser> {
        return await api.post<IUser>('/auth/register', userData);
    }

    /**
     * Get current user profile
     */
    async getCurrentUser(): Promise<IUser> {
        return await api.get<IUser>('/users/me');
    }

    /**
     * Logout user and remove token
     */
    logout(): void {
        localStorage.removeItem('token');
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    /**
     * Get stored token
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export default new AuthService();