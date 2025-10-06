# Integração API - Frontend

Este documento explica como a API está sincronizada com o frontend.

## Estrutura de Tipos

### 1. Tipos Compartilhados (`/types/property.ts`)

Os tipos são baseados no schema Prisma da API:

- **Property**: Interface principal da propriedade
- **PropertyType**: Enum com tipos de propriedade (CASA, APARTAMENTO, etc.)
- **PropertyStatus**: Enum com status (ACTIVE, INACTIVE, etc.)
- **PropertyFilters**: Interface para filtros de busca
- **PropertyCardData**: Interface otimizada para o componente PropertyCard

### 2. Serviços da API (`/lib/api.ts`)

#### AuthService
- `login()`: Autenticação de usuário
- `register()`: Registro de usuário
- `getProfile()`: Obter perfil do usuário
- `updateProfile()`: Atualizar perfil
- `logout()`: Logout

#### PropertyService
- `getProperties()`: Listar propriedades com filtros e paginação
- `getPropertyById()`: Obter propriedade por ID
- `createProperty()`: Criar nova propriedade
- `updateProperty()`: Atualizar propriedade
- `deleteProperty()`: Deletar propriedade
- `getUserProperties()`: Obter propriedades do usuário logado

### 3. Hook Personalizado (`/hooks/useProperties.ts`)

Hook que gerencia o estado das propriedades:

```typescript
const { 
  properties, 
  loading, 
  error, 
  pagination, 
  loadProperties, 
  applyFilters, 
  clearFilters 
} = useProperties();
```

## Como Usar

### 1. Listar Propriedades

```typescript
import { useProperties } from '@/hooks/useProperties';

function MyComponent() {
  const { properties, loading, error } = useProperties();
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

### 2. Aplicar Filtros

```typescript
import { PropertyType } from '@/types/property';

const { applyFilters } = useProperties();

// Filtrar por tipo
applyFilters({ type: PropertyType.CASA });

// Filtrar por preço
applyFilters({ 
  minPrice: 100000, 
  maxPrice: 500000 
});

// Múltiplos filtros
applyFilters({
  type: PropertyType.APARTAMENTO,
  city: 'São Paulo',
  bedrooms: 2
});
```

### 3. Paginação

```typescript
const { pagination, loadProperties } = useProperties();

// Ir para próxima página
loadProperties(pagination.page + 1);

// Ir para página específica
loadProperties(3);
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto web:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Interceptors

O Axios está configurado com interceptors para:

1. **Request**: Adicionar token de autenticação automaticamente
2. **Response**: Tratar erros 401 (token expirado) redirecionando para login

## Estrutura de Resposta da API

Todas as respostas seguem o padrão:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### Resposta de Propriedades

```typescript
interface PropertiesResponse {
  success: boolean;
  data: {
    data: Property[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

## Tratamento de Erros

O sistema trata automaticamente:

1. **Erro de rede**: Mostra mensagem de erro
2. **Token expirado**: Redireciona para login
3. **Erro de validação**: Mostra mensagem específica

## Exemplos de Uso

### Buscar Propriedades com Filtros

```typescript
import { propertyService } from '@/lib/api';
import { PropertyType } from '@/types/property';

const searchProperties = async () => {
  const response = await propertyService.getProperties({
    type: PropertyType.CASA,
    city: 'São Paulo',
    minPrice: 200000,
    maxPrice: 500000
  }, 1, 12);
  
  if (response.success) {
    console.log(response.data);
  }
};
```

### Criar Nova Propriedade

```typescript
import { propertyService } from '@/lib/api';
import { CreatePropertyRequest, PropertyType } from '@/types/property';

const createProperty = async () => {
  const propertyData: CreatePropertyRequest = {
    title: 'Casa com 3 quartos',
    description: 'Casa moderna em condomínio fechado',
    price: 450000,
    type: PropertyType.CASA,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    images: ['https://example.com/image1.jpg'],
    features: ['Piscina', 'Garagem']
  };
  
  const response = await propertyService.createProperty(propertyData);
  
  if (response.success) {
    console.log('Propriedade criada:', response.data);
  }
};
```

## Próximos Passos

1. Implementar cache com React Query
2. Adicionar testes unitários
3. Implementar upload de imagens
4. Adicionar validação de formulários
5. Implementar busca em tempo real
