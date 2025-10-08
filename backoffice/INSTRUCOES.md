# 🚀 Instruções de Uso - QueroHouse Backoffice

## ✅ **Instalação Concluída com Sucesso!**

O backoffice foi criado e configurado com todas as funcionalidades. Aqui estão as instruções para usar:

## 🔧 **Configuração Inicial**

### 1. **Variáveis de Ambiente**
Crie o arquivo `.env.local` na pasta `backoffice`:
```bash
cp env.local.example .env.local
```

Edite o arquivo `.env.local` e configure:
```env
# URL da sua API (ajuste conforme necessário)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Configurações do Next.js
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-secret-key-here

# Ambiente
NODE_ENV=development
```

### 2. **Executar o Projeto**
```bash
cd backoffice
npm run dev
```

O backoffice estará disponível em: **http://localhost:3002**

## 🔐 **Acesso ao Sistema**

### **Login**
- Acesse: `http://localhost:3002/login`
- Use as credenciais de administrador da sua API
- O sistema redirecionará automaticamente após o login

### **Permissões**
- **ADMIN**: Acesso completo a todas as funcionalidades
- **Outros roles**: Acesso limitado conforme configurado

## 📱 **Funcionalidades Disponíveis**

### **1. Dashboard** (`/`)
- Métricas principais (usuários, propriedades, visualizações)
- Gráficos de crescimento
- Atividade recente
- Cards estatísticos

### **2. Propriedades** (`/properties`)
- ✅ Listagem completa com paginação
- ✅ Filtros avançados (tipo, status, localização, preço)
- ✅ Busca por texto
- ✅ Controle de status (ativo, inativo, vendido, alugado)
- ✅ Ações de edição e exclusão

### **3. Usuários** (`/users`)
- ✅ Listagem de todos os usuários
- ✅ Filtros por role (admin, corretor, proprietário, etc.)
- ✅ Busca por nome ou email
- ✅ Controle de roles e permissões
- ✅ Verificação de status de email

### **4. Relatórios** (`/reports`)
- ✅ Gráficos interativos (crescimento de usuários/propriedades)
- ✅ Análise de dados por tipo e status
- ✅ Métricas de visualizações
- ✅ Filtros por período
- ✅ Exportação de relatórios (PDF, Excel)

### **5. Configurações** (`/settings`)
- ✅ Perfil do administrador
- ✅ Configurações de notificações
- ✅ Segurança da conta
- ✅ Chaves de API
- ✅ Configurações gerais do sistema

## 🎨 **Design e Interface**

### **Responsividade**
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (até 767px)

### **Componentes**
- ✅ Sidebar colapsível
- ✅ Header com informações do usuário
- ✅ Loading states
- ✅ Feedback visual
- ✅ Tratamento de erros

## 🔧 **Tecnologias Utilizadas**

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Heroicons** - Ícones SVG
- **Recharts** - Gráficos e visualizações
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Cache e sincronização de dados

## 🚀 **Comandos Disponíveis**

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Start em produção
npm start
```

## 📊 **Integração com API**

O backoffice está totalmente integrado com sua API existente:

- **Autenticação**: Usa o mesmo sistema de login da API
- **Endpoints**: Conecta com todos os endpoints da API
- **Dados**: Sincronização em tempo real
- **Segurança**: Controle de acesso baseado em roles

## 🛠️ **Personalização**

### **Cores e Tema**
- Edite `src/app/globals.css` para personalizar cores
- Use as classes Tailwind para ajustes rápidos

### **Componentes**
- Todos os componentes estão em `src/components/`
- Fácil de modificar e estender

### **Páginas**
- Páginas em `src/app/` seguindo o App Router do Next.js
- Fácil de adicionar novas funcionalidades

## 🔒 **Segurança**

- ✅ Autenticação obrigatória
- ✅ Controle de acesso por roles
- ✅ Rotas protegidas
- ✅ Validação de dados
- ✅ Sanitização de inputs

## 📈 **Performance**

- ✅ Lazy loading de componentes
- ✅ Cache de dados com React Query
- ✅ Otimização de imagens
- ✅ Bundle splitting
- ✅ Compressão de assets

## 🎯 **Próximos Passos**

1. **Configure a URL da API** no arquivo `.env.local`
2. **Teste o login** com credenciais de administrador
3. **Explore as funcionalidades** disponíveis
4. **Personalize** conforme suas necessidades

## 🆘 **Suporte**

Se encontrar algum problema:

1. Verifique se a API está rodando na porta 3001
2. Confirme as credenciais de administrador
3. Verifique as configurações do `.env.local`
4. Consulte os logs do console para erros

---

**🎉 Parabéns! Seu backoffice está pronto para uso!**
