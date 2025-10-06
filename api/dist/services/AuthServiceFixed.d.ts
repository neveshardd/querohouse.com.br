import { LoginRequest, RegisterRequest, AuthResponse, ApiResponse, User } from '@/types/auth';
export declare class AuthServiceFixed {
    private jwtSecret;
    login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>>;
    register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>>;
    logout(sessionId: string): Promise<ApiResponse>;
    getProfile(sessionId: string): Promise<ApiResponse<User>>;
    updateProfile(sessionId: string, userData: any): Promise<ApiResponse<User>>;
    forgotPassword(data: any): Promise<ApiResponse>;
    resetPassword(data: any): Promise<ApiResponse>;
}
//# sourceMappingURL=AuthServiceFixed.d.ts.map