import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSimple() {
  try {
    console.log('🌱 Iniciando seed simples...');

    // Limpar tudo primeiro
    await prisma.property.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Dados existentes removidos');

    // Criar usuários
    const user1 = await prisma.user.create({
      data: {
        name: 'Maria Silva',
        email: 'maria@exemplo.com',
        phone: '(61) 99999-1111',
        role: 'PROPRIETARIO',
        emailVerified: true
      }
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'João Santos',
        email: 'joao@exemplo.com',
        phone: '(61) 99999-2222',
        role: 'CORRETOR',
        emailVerified: true
      }
    });

    console.log('✅ Usuários criados');

    // Criar propriedades
    const properties = [
      {
        title: 'Casa Moderna no Lago Sul',
        description: 'Exclusiva casa moderna no Lago Sul com vista para o lago, 4 quartos, 3 banheiros, área de lazer completa com piscina e jardim.',
        price: 1200000,
        type: 'CASA' as const,
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        address: 'SHIS QI 15, Conjunto 5, Casa 12',
        city: 'Brasília',
        state: 'DF',
        zipCode: '71640-125',
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
        features: ['Piscina', 'Jardim', 'Garagem para 3 carros', 'Área de lazer', 'Vista para o lago'],
        isPublished: true,
        views: 150,
        userId: user1.id
      },
      {
        title: 'Apartamento Luxo na Asa Norte',
        description: 'Apartamento de luxo na Asa Norte com 3 quartos, 2 banheiros, varanda gourmet e acabamento de primeira qualidade.',
        price: 850000,
        type: 'APARTAMENTO' as const,
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        address: 'SQS 115, Bloco A, Apto 501',
        city: 'Brasília',
        state: 'DF',
        zipCode: '70377-100',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
        features: ['Portaria 24h', 'Academia', 'Piscina', 'Salão de festas', 'Varanda gourmet'],
        isPublished: true,
        views: 120,
        userId: user2.id
      },
      {
        title: 'Casa Popular no Guará',
        description: 'Casa popular no Guará com 3 quartos, 2 banheiros, área de lazer e garagem para 2 carros.',
        price: 380000,
        type: 'CASA' as const,
        bedrooms: 3,
        bathrooms: 2,
        area: 140,
        address: 'QE 23, Conjunto A, Casa 8',
        city: 'Brasília',
        state: 'DF',
        zipCode: '71020-230',
        images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
        features: ['Área de lazer', 'Garagem', 'Jardim'],
        isPublished: true,
        views: 25,
        userId: user1.id
      },
      {
        title: 'Apartamento 1 Quarto - Ceilândia',
        description: 'Apartamento econômico na Ceilândia com 1 quarto, 1 banheiro e varanda.',
        price: 180000,
        type: 'APARTAMENTO' as const,
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        address: 'QNN 8, Conjunto A, Apto 101',
        city: 'Brasília',
        state: 'DF',
        zipCode: '72215-100',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
        features: ['Varanda', 'Portaria'],
        isPublished: true,
        views: 45,
        userId: user2.id
      }
    ];

    for (const property of properties) {
      await prisma.property.create({
        data: {
          ...property,
          images: JSON.stringify(property.images),
          features: JSON.stringify(property.features),
        }
      });
      console.log(`✅ ${property.title} - R$ ${property.price.toLocaleString('pt-BR')}`);
    }

    // Estatísticas
    const totalProperties = await prisma.property.count();
    const totalUsers = await prisma.user.count();
    
    console.log('\n📊 Estatísticas:');
    console.log(`🏠 Propriedades: ${totalProperties}`);
    console.log(`👥 Usuários: ${totalUsers}`);
    console.log('\n🎉 Seed concluído!');
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSimple();
