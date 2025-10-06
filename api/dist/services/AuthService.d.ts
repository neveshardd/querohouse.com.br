import { LoginRequest, RegisterRequest, ForgotPasswordRequest, ResetPasswordRequest, UpdateProfileRequest, AuthResponse, ApiResponse, User } from '@/types/auth';
export declare class AuthService {
    login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>>;
    register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>>;
    logout(sessionId: string): Promise<ApiResponse>;
    getProfile(sessionId: string): Promise<ApiResponse<User>>;
    updateProfile(sessionId: string, userData: UpdateProfileRequest): Promise<ApiResponse<User>>;
    forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse>;
    resetPassword(data: ResetPasswordRequest): Promise<ApiResponse>;
}
//# sourceMappingURL=AuthService.d.ts.map