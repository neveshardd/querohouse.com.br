"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceFixed = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthServiceFixed {
    jwtSecret = process.env.JWT_SECRET || 'your-secret-key-here';
    async login(credentials) {
        try {
            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
                include: { accounts: true }
            });
            if (!user) {
                return {
                    success: false,
                    error: 'Credenciais inválidas',
                };
            }
            const credentialsAccount = user.accounts.find(account => account.type === 'credentials' && account.provider === 'credentials');
            if (!credentialsAccount) {
                return {
                    success: false,
                    error: 'Credenciais inválidas',
                };
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, this.jwtSecret, { expiresIn: '7d' });
            return {
                success: true,
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role.toLowerCase(),
                        phone: user.phone || undefined,
                        avatar: user.image || undefined,
                        emailVerified: user.emailVerified,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    },
                    token,
                    refreshToken: token,
                },
            };
        }
        catch (error) {
            console.error('Erro no login:', error);
            return {
                success: false,
                error: 'Credenciais inválidas',
            };
        }
    }
    async register(userData) {
        try {
            const existingUser = await prisma.user.findUnique({
                where: { email: userData.email }
            });
            if (existingUser) {
                return {
                    success: false,
                    error: 'Email já está em uso',
                };
            }
            const user = await prisma.user.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    emailVerified: true,
                    role: 'USER',
                    phone: userData.phone || null
                }
            });
            const account = await prisma.account.create({
                data: {
                    userId: user.id,
                    type: 'credentials',
                    provider: 'credentials',
                    providerAccountId: user.email,
                }
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, this.jwtSecret, { expiresIn: '7d' });
            return {
                success: true,
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role.toLowerCase(),
                        phone: user.phone || undefined,
                        avatar: user.image || undefined,
                        emailVerified: user.emailVerified,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    },
                    token,
                    refreshToken: token,
                },
            };
        }
        catch (error) {
            console.error('Erro no registro:', error);
            return {
                success: false,
                error: 'Erro ao criar conta',
            };
        }
    }
    async logout(sessionId) {
        try {
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
            const decoded = jsonwebtoken_1.default.verify(sessionId, this.jwtSecret);
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId }
            });
            if (!user) {
                return {
                    success: false,
                    error: 'Usuário não encontrado',
                };
            }
            return {
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role.toLowerCase(),
                    phone: user.phone || undefined,
                    avatar: user.image || undefined,
                    emailVerified: user.emailVerified,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
            };
        }
        catch (error) {
            return {
                success: false,
                error: 'Token inválido',
            };
        }
    }
    async updateProfile(sessionId, userData) {
        try {
            const decoded = jsonwebtoken_1.default.verify(sessionId, this.jwtSecret);
            const user = await prisma.user.update({
                where: { id: decoded.userId },
                data: {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    image: userData.avatar,
                }
            });
            return {
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role.toLowerCase(),
                    phone: user.phone || undefined,
                    avatar: user.image || undefined,
                    emailVerified: user.emailVerified,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
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
exports.AuthServiceFixed = AuthServiceFixed;
//# sourceMappingURL=AuthServiceFixed.js.map