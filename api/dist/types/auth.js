"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileSchema = exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    phone: zod_1.z.string().optional(),
    role: zod_1.z.enum(['user', 'corretor', 'proprietario', 'incorporadora']).optional(),
});
exports.ForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email inválido'),
});
exports.ResetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token é obrigatório'),
    password: zod_1.z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
exports.UpdateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
    email: zod_1.z.string().email('Email inválido').optional(),
    phone: zod_1.z.string().optional(),
    avatar: zod_1.z.string().url('Avatar deve ser uma URL válida').optional(),
});
//# sourceMappingURL=auth.js.map