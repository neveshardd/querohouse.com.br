import { FastifyRequest, FastifyReply } from 'fastify';
export declare function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<undefined>;
export declare function requireRole(roles: string[]): (request: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
//# sourceMappingURL=auth.d.ts.map