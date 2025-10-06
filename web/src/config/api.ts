// Configuração da API
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
};

export default API_CONFIG;
