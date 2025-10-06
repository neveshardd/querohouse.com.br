"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.prisma = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(exports.prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 6,
    },
    socialProviders: {
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        }),
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    plugins: [],
    secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
    advanced: {
        useSecureCookies: false,
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_URL || 'http://localhost:3001',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    logger: {
        level: 'debug',
    },
    disableCSRFCheck: true,
    generateId: () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
});
//# sourceMappingURL=database.js.map