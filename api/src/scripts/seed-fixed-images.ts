import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedFixedImages() {
  try {
    console.log('🌱 Iniciando seed com imagens corrigidas...');

    // Limpar tudo primeiro
    await prisma.property.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Dados existentes removidos');

    // Criar usuários
    const users = await Promise.all([
      prisma.user.create({
        data: {
          name: 'Maria Silva',
          email: 'maria@exemplo.com',
          phone: '(61) 99999-1111',
          role: 'PROPRIETARIO',
          emailVerified: true
        }
      }),
      prisma.user.create({
        data: {
          name: 'João Santos',
          email: 'joao@exemplo.com',
          phone: '(61) 99999-2222',
          role: 'CORRETOR',
          emailVerified: true
        }
      }),
      prisma.user.create({
        data: {
          name: 'Ana Costa',
          email: 'ana@exemplo.com',
          phone: '(61) 99999-3333',
          role: 'INCORPORADORA',
          emailVerified: true
        }
      })
    ]);

    console.log(`✅ ${users.length} usuários criados`);

    // Imagens que funcionam do Unsplash
    const workingImages = {
      house1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      house2: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      apartment1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      apartment2: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      house3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      apartment3: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    };

    // Criar propriedades com imagens que funcionam
    const properties = [
      // PROPRIEDADES EM DESTAQUE
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
        images: [workingImages.house1, workingImages.house2],
        features: ['Piscina', 'Jardim', 'Garagem para 3 carros', 'Área de lazer', 'Vista para o lago'],
        isPublished: true,
        views: 150,
        userId: users[0].id
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
        images: [workingImages.apartment1, workingImages.apartment2],
        features: ['Portaria 24h', 'Academia', 'Piscina', 'Salão de festas', 'Varanda gourmet'],
        isPublished: true,
        views: 120,
        userId: users[1].id
      },
      {
        title: 'Casa com Piscina no Plano Piloto',
        description: 'Casa charmosa no Plano Piloto com 3 quartos, 2 banheiros, piscina e área de lazer completa.',
        price: 750000,
        type: 'CASA' as const,
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        address: 'SQN 108, Bloco A, Casa 15',
        city: 'Brasília',
        state: 'DF',
        zipCode: '70733-100',
        images: [workingImages.house3],
        features: ['Piscina', 'Área de lazer', 'Garagem', 'Jardim', 'Localização privilegiada'],
        isPublished: true,
        views: 95,
        userId: users[0].id
      },
      {
        title: 'Apartamento 2 Quartos - Asa Sul',
        description: 'Apartamento aconchegante na Asa Sul com 2 quartos, 1 banheiro, varanda e excelente localização.',
        price: 450000,
        type: 'APARTAMENTO' as const,
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        address: 'SQS 208, Bloco B, Apto 203',
        city: 'Brasília',
        state: 'DF',
        zipCode: '70258-100',
        images: [workingImages.apartment1],
        features: ['Portaria', 'Varanda', 'Localização central'],
        isPublished: true,
        views: 80,
        userId: users[1].id
      },

      // PROPRIEDADES RECENTES
      {
        title: 'Casa Nova no Guará',
        description: 'Casa nova no Guará com 3 quartos, 2 banheiros, área de lazer e garagem para 2 carros.',
        price: 380000,
        type: 'CASA' as const,
        bedrooms: 3,
        bathrooms: 2,
        area: 140,
        address: 'QE 23, Conjunto A, Casa 8',
        city: 'Brasília',
        state: 'DF',
        zipCode: '71020-230',
        images: [workingImages.house1],
        features: ['Área de lazer', 'Garagem', 'Jardim'],
        isPublished: true,
        views: 25,
        userId: users[2].id
      },
      {
        title: 'Apartamento no Taguatinga',
        description: 'Apartamento moderno no Taguatinga com 2 quartos, 1 banheiro e varanda.',
        price: 320000,
        type: 'APARTAMENTO' as const,
        bedrooms: 2,
        bathrooms: 1,
        area: 65,
        address: 'QNA 15, Conjunto A, Apto 304',
        city: 'Brasília',
        state: 'DF',
        zipCode: '72115-150',
        images: [workingImages.apartment2],
        features: ['Varanda', 'Portaria'],
        isPublished: true,
        views: 15,
        userId: users[1].id
      },
      {
        title: 'Casa no Núcleo Bandeirante',
        description: 'Casa aconchegante no Núcleo Bandeirante com 2 quartos, 1 banheiro e quintal.',
        price: 280000,
        type: 'CASA' as const,
        bedrooms: 2,
        bathrooms: 1,
        area: 90,
        address: 'Rua 15, Lote 25',
        city: 'Brasília',
        state: 'DF',
        zipCode: '71705-100',
        images: [workingImages.house2],
        features: ['Quintal', 'Garagem'],
        isPublished: true,
        views: 10,
        userId: users[0].id
      },

      // PROPRIEDADES COM MELHOR PREÇO
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
        images: [workingImages.apartment3],
        features: ['Varanda', 'Portaria'],
        isPublished: true,
        views: 45,
        userId: users[1].id
      },
      {
        title: 'Casa Popular no Recanto das Emas',
        description: 'Casa popular no Recanto das Emas com 2 quartos, 1 banheiro e quintal.',
        price: 220000,
        type: 'CASA' as const,
        bedrooms: 2,
        bathrooms: 1,
        area: 70,
        address: 'QR 403, Conjunto 1, Casa 15',
        city: 'Brasília',
        state: 'DF',
        zipCode: '72610-100',
        images: [workingImages.house1],
        features: ['Quintal', 'Garagem'],
        isPublished: true,
        views: 35,
        userId: users[2].id
      },
      {
        title: 'Apartamento 2 Quartos - Samambaia',
        description: 'Apartamento em Samambaia com 2 quartos, 1 banheiro e varanda.',
        price: 250000,
        type: 'APARTAMENTO' as const,
        bedrooms: 2,
        bathrooms: 1,
        area: 60,
        address: 'QN 301, Conjunto 2, Apto 205',
        city: 'Brasília',
        state: 'DF',
        zipCode: '72315-100',
        images: [workingImages.apartment1],
        features: ['Varanda', 'Portaria'],
        isPublished: true,
        views: 30,
        userId: users[1].id
      }
    ];

    console.log('🏠 Criando propriedades com imagens funcionais...');
    
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

    // Estatísticas finais
    const totalProperties = await prisma.property.count();
    const publishedProperties = await prisma.property.count({ where: { isPublished: true } });
    const totalUsers = await prisma.user.count();
    const totalViews = await prisma.property.aggregate({
      _sum: { views: true }
    });

    console.log('\n📊 Estatísticas finais:');
    console.log(`🏠 Total de propriedades: ${totalProperties}`);
    console.log(`✅ Propriedades publicadas: ${publishedProperties}`);
    console.log(`👥 Total de usuários: ${totalUsers}`);
    console.log(`👀 Total de visualizações: ${totalViews._sum.views || 0}`);
    
    console.log('\n🎉 Seed com imagens corrigidas concluído!');
    
  } catch (error) {
    console.error('❌ Erro ao criar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFixedImages();
