import { FastifyRequest, FastifyReply } from 'fastify';
export declare class AuthController {
    private authService;
    constructor();
    login(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    register(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    logout(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    getProfile(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    updateProfile(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    forgotPassword(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    resetPassword(request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=AuthController.d.ts.map