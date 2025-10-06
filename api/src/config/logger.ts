import pino from 'pino';

/**
 * Configuração centralizada do Logger
 * Usa pino-pretty padrão sem customizações
 */

// Configuração do logger
const loggerConfig = {
  transport: { 
    target: 'pino-pretty'
  }
};

// Instância centralizada do logger
export const logger = pino(loggerConfig);