import { PrismaClient } from '@prisma/client';
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").Adapter;
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: false;
        minPasswordLength: number;
    };
    socialProviders: {
        google?: {
            clientId: string;
            clientSecret: string;
        } | undefined;
    };
    session: {
        expiresIn: number;
        updateAge: number;
    };
    plugins: [];
    secret: string;
    baseURL: string;
    advanced: {
        useSecureCookies: false;
    };
    trustedOrigins: string[];
    logger: {
        level: "debug";
    };
    disableCSRFCheck: boolean;
    generateId: () => string;
}>;
export type Auth = typeof auth;
//# sourceMappingURL=database.d.ts.map