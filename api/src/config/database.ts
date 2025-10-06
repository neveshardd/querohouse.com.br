import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

// Instância do Prisma
export const prisma = new PrismaClient();

// Configuração do banco de dados
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Desabilitado temporariamente para testes
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
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // 1 dia
  },
  plugins: [],
  // Configuração específica para resolver o problema do campo type
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
  // Configuração específica para resolver o problema do campo type
  advanced: {
    useSecureCookies: false, // Para desenvolvimento
  },
  // Configuração de origens confiáveis
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || 'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  // Configuração específica para resolver o problema do campo type
  logger: {
    level: 'debug',
  },
  // Configuração específica para resolver o problema do campo type
  disableCSRFCheck: true,
  // Configuração específica para resolver o problema do campo type
  generateId: () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },
});

export type Auth = typeof auth;
