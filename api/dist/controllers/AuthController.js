"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthServiceFixed_1 = require("@/services/AuthServiceFixed");
const logger_1 = require("@/config/logger");
const auth_1 = require("@/types/auth");
class AuthController {
    authService;
    constructor() {
        this.authService = new AuthServiceFixed_1.AuthServiceFixed();
    }
    async login(request, reply) {
        try {
            logger_1.logger.info('Tentativa de login iniciada');
            const credentials = auth_1.LoginSchema.parse(request.body);
            const result = await this.authService.login(credentials);
            logger_1.logger.info(`Resultado do login: ${JSON.stringify(result, null, 2)}`);
            if (!result.success) {
                logger_1.logger.error('Login falhou - credenciais inválidas');
                return reply.status(401).send(result);
            }
            logger_1.logger.info('Login realizado com sucesso');
            return reply.status(200).send(result);
        }
        catch (error) {
            logger_1.logger.error({ error }, 'Erro no processo de login');
            return reply.status(400).send({
                success: false,
                error: 'Dados inválidos',
            });
        }
    }
    async register(request, reply) {
        try {
            logger_1.logger.info('Tentativa de registro iniciada');
            logger_1.logger.info({
                name: request.body?.name,
                email: request.body?.email,
                password: request.body?.password,
                passwordLength: request.body?.password?.length,
                phone: request.body?.phone,
                role: request.body?.role
            }, 'Dados recebidos');
            const userData = auth_1.RegisterSchema.parse(request.body);
            logger_1.logger.info('Dados validados com sucesso');
            const result = await this.authService.register(userData);
            logger_1.logger.info('Resultado do registro');
            if (!result.success) {
                logger_1.logger.error('Registro falhou');
                return reply.status(400).send(result);
            }
            logger_1.logger.info('Registro realizado com sucesso');
            return reply.status(201).send(result);
        }
        catch (error) {
            logger_1.logger.error({ error }, 'Erro no processo de registro');
            let errorMessage = 'Dados inválidos';
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
                else {
                    errorMessage = error.message;
                }
            }
            logger_1.logger.error('Erro específico: ' + errorMessage);
            return reply.status(400).send({
                success: false,
                error: errorMessage,
            });
        }
    }
    async logout(request, reply) {
        try {
            const sessionId = request.headers.authorization?.replace('Bearer ', '');
            if (!sessionId) {
                return reply.status(401).send({
                    success: false,
                    error: 'Token não fornecido',
                });
            }
            const result = await this.authService.logout(sessionId);
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor',
            });
        }
    }
    async getProfile(request, reply) {
        try {
            const sessionId = request.headers.authorization?.replace('Bearer ', '');
            if (!sessionId) {
                return reply.status(401).send({
                    success: false,
                    error: 'Token não fornecido',
                });
            }
            const result = await this.authService.getProfile(sessionId);
            if (!result.success) {
                return reply.status(401).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor',
            });
        }
    }
    async updateProfile(request, reply) {
        try {
            const sessionId = request.headers.authorization?.replace('Bearer ', '');
            if (!sessionId) {
                return reply.status(401).send({
                    success: false,
                    error: 'Token não fornecido',
                });
            }
            const userData = auth_1.UpdateProfileSchema.parse(request.body);
            const result = await this.authService.updateProfile(sessionId, userData);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(400).send({
                success: false,
                error: 'Dados inválidos',
            });
        }
    }
    async forgotPassword(request, reply) {
        try {
            const data = auth_1.ForgotPasswordSchema.parse(request.body);
            const result = await this.authService.forgotPassword(data);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(400).send({
                success: false,
                error: 'Dados inválidos',
            });
        }
    }
    async resetPassword(request, reply) {
        try {
            const data = auth_1.ResetPasswordSchema.parse(request.body);
            const result = await this.authService.resetPassword(data);
            if (!result.success) {
                return reply.status(400).send(result);
            }
            return reply.status(200).send(result);
        }
        catch (error) {
            return reply.status(400).send({
                success: false,
                error: 'Dados inválidos',
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map