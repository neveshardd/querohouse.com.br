"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("../config/database");
class AuthService {
    async login(credentials) {
        try {
            const result = await database_1.auth.api.signInEmail({
                body: {
                    email: credentials.email,
                    password: credentials.password,
                },
            });
            if (!result) {
                return {
                    success: false,
                    error: 'Credenciais inválidas',
                };
            }
            return {
                success: true,
                data: {
                    user: result.user,
                    token: result.session ? result.session.id : '',
                    refreshToken: result.session ? result.session.id : '',
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Credenciais inválidas',
            };
        }
    }
    async register(userData) {
        try {
            console.log('Tentando registrar usuário:', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                passwordLength: userData.password?.length,
                phone: userData.phone,
                role: userData.role
            });
            const result = await database_1.auth.api.signUpEmail({
                body: {
                    email: userData.email,
                    password: userData.password,
                    name: userData.name,
                },
            });
            if (!result) {
                return {
                    success: false,
                    error: 'Erro ao criar usuário',
                };
            }
            return {
                success: true,
                data: {
                    user: result.user,
                    token: result.session ? result.session.id : '',
                    refreshToken: result.session ? result.session.id : '',
                },
            };
        }
        catch (error) {
            let errorMessage = 'Erro interno do servidor';
            if (error instanceof Error) {
                const errorMsg = error.message.toLowerCase();
                if (errorMsg.includes('email') && (errorMsg.includes('already') || errorMsg.includes('exists') || errorMsg.includes('duplicate'))) {
                    errorMessage = 'Email já está em uso';
                }
                else if (errorMsg.includes('password') && (errorMsg.includes('weak') || errorMsg.includes('invalid') || errorMsg.includes('short'))) {
                    errorMessage = 'Senha deve ter pelo menos 6 caracteres';
                }
                else if (errorMsg.includes('name') && (errorMsg.includes('invalid') || errorMsg.includes('required'))) {
                    errorMessage = 'Nome é obrigatório';
                }
                else if (errorMsg.includes('validation') || errorMsg.includes('invalid')) {
                    errorMessage = 'Dados inválidos. Verifique os campos preenchidos';
                }
                else if (errorMsg.includes('type') && errorMsg.includes('missing')) {
                    errorMessage = 'Erro de configuração do sistema. Tente novamente.';
                }
                else {
                    errorMessage = error.message;
                }
            }
            return {
                success: false,
                error: errorMessage,
            };
        }
    }
    async logout(sessionId) {
        try {
            await database_1.auth.api.signOut({
                headers: {
                    authorization: `Bearer ${sessionId}`,
                },
            });
            return {
                success: true,
                message: 'Logout realizado com sucesso',
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao realizar logout',
            };
        }
    }
    async getProfile(sessionId) {
        try {
            const result = await database_1.auth.api.getSession({
                headers: {
                    authorization: `Bearer ${sessionId}`,
                },
            });
            if (!result) {
                return {
                    success: false,
                    error: 'Sessão inválida',
                };
            }
            return {
                success: true,
                data: result.user,
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao obter perfil',
            };
        }
    }
    async updateProfile(sessionId, userData) {
        try {
            const result = await database_1.auth.api.updateUser({
                body: userData,
                headers: {
                    authorization: `Bearer ${sessionId}`,
                },
            });
            if (!result) {
                return {
                    success: false,
                    error: 'Erro ao atualizar perfil',
                };
            }
            return {
                success: true,
                data: result.user,
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao atualizar perfil',
            };
        }
    }
    async forgotPassword(data) {
        try {
            await database_1.auth.api.forgetPassword({
                body: {
                    email: data.email,
                    redirectTo: process.env.REDIRECT_URL || 'http://localhost:3000/reset-password',
                },
            });
            return {
                success: true,
                message: 'Email de recuperação enviado',
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao enviar email de recuperação',
            };
        }
    }
    async resetPassword(data) {
        try {
            await database_1.auth.api.resetPassword({
                body: {
                    token: data.token,
                    newPassword: data.password,
                },
            });
            return {
                success: true,
                message: 'Senha alterada com sucesso',
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Erro ao alterar senha',
            };
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map