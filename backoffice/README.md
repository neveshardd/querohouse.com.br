# QueroHouse Backoffice

Painel administrativo completo para a plataforma QueroHouse, desenvolvido com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

### Dashboard
- Visão geral das métricas principais
- Estatísticas de usuários, propriedades e visualizações
- Gráficos e relatórios em tempo real
- Atividade recente

### Gestão de Propriedades
- Listagem completa de propriedades
- Filtros avançados (tipo, status, localização, preço)
- Busca por texto
- Edição e exclusão de propriedades
- Controle de status (ativo, inativo, vendido, alugado)
- Paginação

### Gestão de Usuários
- Listagem de todos os usuários
- Filtros por role (admin, corretor, proprietário, etc.)
- Busca por nome ou email
- Controle de roles e permissões
- Verificação de status de email

### Relatórios
- Gráficos de crescimento de usuários
- Análise de propriedades por tipo e status
- Métricas de visualizações
- Exportação de dados (PDF, Excel)
- Filtros por período

### Configurações
- Perfil do administrador
- Configurações de notificações
- Segurança da conta
- Chaves de API
- Configurações gerais do sistema

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Heroicons** - Ícones SVG
- **Recharts** - Gráficos e visualizações
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Cache e sincronização de dados

## 📦 Instalação

1. Clone o repositório
2. Navegue para a pasta do backoffice:
   ```bash
   cd backoffice
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   ```bash
   cp env.local.example .env.local
   ```

5. Configure a URL da API no arquivo `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

6. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

7. Acesse o backoffice em: `http://localhost:3002`

## 🔐 Autenticação

O backoffice utiliza o mesmo sistema de autenticação da API principal. Para acessar:

1. Faça login com credenciais de administrador
2. O sistema verifica automaticamente as permissões
3. Usuários com role `ADMIN` têm acesso completo
4. Outros roles têm acesso limitado conforme configurado

## 📱 Responsividade

O backoffice é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🎨 Design System

- **Cores**: Paleta consistente com tons de azul, cinza e verde
- **Tipografia**: Sistema de fontes hierárquico
- **Componentes**: Reutilizáveis e consistentes
- **Espaçamento**: Grid system baseado em Tailwind

## 🔧 Estrutura do Projeto

```
backoffice/
├── src/
│   ├── app/                 # Páginas (App Router)
│   │   ├── login/          # Página de login
│   │   ├── properties/     # Gestão de propriedades
│   │   ├── users/          # Gestão de usuários
│   │   ├── reports/        # Relatórios
│   │   └── settings/       # Configurações
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Hooks customizados
│   ├── lib/                # Utilitários e configurações
│   └── types/              # Definições TypeScript
├── public/                 # Arquivos estáticos
└── package.json           # Dependências
```

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente de produção
2. Execute o build:
   ```bash
   npm run build
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

## 📊 Monitoramento

O backoffice inclui:
- Logs de atividades
- Métricas de performance
- Tratamento de erros
- Loading states
- Feedback visual

## 🔒 Segurança

- Autenticação obrigatória
- Controle de acesso baseado em roles
- Validação de dados
- Sanitização de inputs
- Headers de segurança

## 📈 Performance

- Lazy loading de componentes
- Otimização de imagens
- Cache de dados
- Bundle splitting
- Compressão de assets

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.