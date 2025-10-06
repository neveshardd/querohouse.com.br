"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireRole = requireRole;
const database_1 = require("@/config/database");
async function authMiddleware(request, reply) {
    try {
        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return reply.status(401).send({
                success: false,
                error: 'Token não fornecido',
            });
        }
        const session = await database_1.auth.api.getSession({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        if (!session) {
            return reply.status(401).send({
                success: false,
                error: 'Token inválido ou expirado',
            });
        }
        request.user = session.user;
        request.session = session;
    }
    catch (error) {
        return reply.status(401).send({
            success: false,
            error: 'Erro na validação do token',
        });
    }
}
function requireRole(roles) {
    return async (request, reply) => {
        try {
            const user = request.user;
            if (!user) {
                return reply.status(401).send({
                    success: false,
                    error: 'Usuário não autenticado',
                });
            }
            if (!roles.includes(user.role)) {
                return reply.status(403).send({
                    success: false,
                    error: 'Acesso negado',
                });
            }
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro na verificação de permissões',
            });
        }
    };
}
//# sourceMappingURL=auth.js.map