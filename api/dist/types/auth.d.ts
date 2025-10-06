import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const RegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["user", "corretor", "proprietario", "incorporadora"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    phone?: string | undefined;
    role?: "user" | "corretor" | "proprietario" | "incorporadora" | undefined;
}, {
    email: string;
    password: string;
    name: string;
    phone?: string | undefined;
    role?: "user" | "corretor" | "proprietario" | "incorporadora" | undefined;
}>;
export declare const ForgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const ResetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    token: string;
}, {
    password: string;
    token: string;
}>;
export declare const UpdateProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    avatar?: string | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    phone?: string | undefined;
    avatar?: string | undefined;
}>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'corretor' | 'proprietario' | 'incorporadora';
    phone?: string;
    avatar?: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
//# sourceMappingURL=auth.d.ts.map