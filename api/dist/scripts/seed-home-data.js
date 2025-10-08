"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedHomeData() {
    try {
        console.log('🌱 Iniciando seed de dados para página inicial...');
        let users = await prisma.user.findMany();
        if (users.length === 0) {
            console.log('👤 Criando usuários de exemplo...');
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
            const user3 = await prisma.user.create({
                data: {
                    name: 'Ana Costa',
                    email: 'ana@exemplo.com',
                    phone: '(61) 99999-3333',
                    role: 'INCORPORADORA',
                    emailVerified: true
                }
            });
            users = [user1, user2, user3];
            console.log(`✅ ${users.length} usuários criados`);
        }
        if (users.length === 0) {
            console.log('❌ Nenhum usuário encontrado. Execute primeiro o seed de usuários.');
            return;
        }
        await prisma.property.deleteMany();
        console.log('🧹 Propriedades existentes removidas');
        const properties = [
            {
                title: 'Casa Moderna no Lago Sul',
                description: 'Exclusiva casa moderna no Lago Sul com vista para o lago, 4 quartos, 3 banheiros, área de lazer completa com piscina e jardim.',
                price: 1200000,
                type: 'CASA',
                bedrooms: 4,
                bathrooms: 3,
                area: 280,
                address: 'SHIS QI 15, Conjunto 5, Casa 12',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71640-125',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
                ],
                features: ['Piscina', 'Jardim', 'Garagem para 3 carros', 'Área de lazer', 'Vista para o lago'],
                isPublished: true,
                views: 150,
                userId: users[0].id
            },
            {
                title: 'Apartamento Luxo na Asa Norte',
                description: 'Apartamento de luxo na Asa Norte com 3 quartos, 2 banheiros, varanda gourmet e acabamento de primeira qualidade.',
                price: 850000,
                type: 'APARTAMENTO',
                bedrooms: 3,
                bathrooms: 2,
                area: 120,
                address: 'SQS 115, Bloco A, Apto 501',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70377-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
                ],
                features: ['Portaria 24h', 'Academia', 'Piscina', 'Salão de festas', 'Varanda gourmet'],
                isPublished: true,
                views: 120,
                userId: users[1].id
            },
            {
                title: 'Casa com Piscina no Plano Piloto',
                description: 'Casa charmosa no Plano Piloto com 3 quartos, 2 banheiros, piscina e área de lazer completa.',
                price: 750000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 180,
                address: 'SQN 108, Bloco A, Casa 15',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70733-100',
                images: [
                    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
                ],
                features: ['Piscina', 'Área de lazer', 'Garagem', 'Jardim', 'Localização privilegiada'],
                isPublished: true,
                views: 95,
                userId: users[0].id
            },
            {
                title: 'Apartamento 2 Quartos - Asa Sul',
                description: 'Apartamento aconchegante na Asa Sul com 2 quartos, 1 banheiro, varanda e excelente localização.',
                price: 450000,
                type: 'APARTAMENTO',
                bedrooms: 2,
                bathrooms: 1,
                area: 75,
                address: 'SQS 208, Bloco B, Apto 203',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70258-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Portaria', 'Varanda', 'Localização central'],
                isPublished: true,
                views: 80,
                userId: users[1].id
            },
            {
                title: 'Casa Nova no Guará',
                description: 'Casa nova no Guará com 3 quartos, 2 banheiros, área de lazer e garagem para 2 carros.',
                price: 380000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 140,
                address: 'QE 23, Conjunto A, Casa 8',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71020-230',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Área de lazer', 'Garagem', 'Jardim'],
                isPublished: true,
                views: 25,
                userId: users[2].id
            },
            {
                title: 'Apartamento no Taguatinga',
                description: 'Apartamento moderno no Taguatinga com 2 quartos, 1 banheiro e varanda.',
                price: 320000,
                type: 'APARTAMENTO',
                bedrooms: 2,
                bathrooms: 1,
                area: 65,
                address: 'QNA 15, Conjunto A, Apto 304',
                city: 'Brasília',
                state: 'DF',
                zipCode: '72115-150',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Portaria'],
                isPublished: true,
                views: 15,
                userId: users[1].id
            },
            {
                title: 'Casa no Núcleo Bandeirante',
                description: 'Casa aconchegante no Núcleo Bandeirante com 2 quartos, 1 banheiro e quintal.',
                price: 280000,
                type: 'CASA',
                bedrooms: 2,
                bathrooms: 1,
                area: 90,
                address: 'Rua 15, Lote 25',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71705-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Quintal', 'Garagem'],
                isPublished: true,
                views: 10,
                userId: users[0].id
            },
            {
                title: 'Apartamento 1 Quarto - Ceilândia',
                description: 'Apartamento econômico na Ceilândia com 1 quarto, 1 banheiro e varanda.',
                price: 180000,
                type: 'APARTAMENTO',
                bedrooms: 1,
                bathrooms: 1,
                area: 45,
                address: 'QNN 8, Conjunto A, Apto 101',
                city: 'Brasília',
                state: 'DF',
                zipCode: '72215-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Portaria'],
                isPublished: true,
                views: 45,
                userId: users[1].id
            },
            {
                title: 'Casa Popular no Recanto das Emas',
                description: 'Casa popular no Recanto das Emas com 2 quartos, 1 banheiro e quintal.',
                price: 220000,
                type: 'CASA',
                bedrooms: 2,
                bathrooms: 1,
                area: 70,
                address: 'QR 403, Conjunto 1, Casa 15',
                city: 'Brasília',
                state: 'DF',
                zipCode: '72610-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Quintal', 'Garagem'],
                isPublished: true,
                views: 35,
                userId: users[2].id
            },
            {
                title: 'Apartamento 2 Quartos - Samambaia',
                description: 'Apartamento em Samambaia com 2 quartos, 1 banheiro e varanda.',
                price: 250000,
                type: 'APARTAMENTO',
                bedrooms: 2,
                bathrooms: 1,
                area: 60,
                address: 'QN 301, Conjunto 2, Apto 205',
                city: 'Brasília',
                state: 'DF',
                zipCode: '72315-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Portaria'],
                isPublished: true,
                views: 30,
                userId: users[1].id
            },
            {
                title: 'Casa no Sudoeste',
                description: 'Casa moderna no Sudoeste com 3 quartos, 2 banheiros e área de lazer.',
                price: 650000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 160,
                address: 'SQSW 102, Bloco A, Casa 8',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70680-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Área de lazer', 'Garagem', 'Jardim'],
                isPublished: true,
                views: 60,
                userId: users[0].id
            },
            {
                title: 'Apartamento no Cruzeiro',
                description: 'Apartamento no Cruzeiro com 2 quartos, 1 banheiro e varanda.',
                price: 420000,
                type: 'APARTAMENTO',
                bedrooms: 2,
                bathrooms: 1,
                area: 70,
                address: 'SCS 102, Bloco A, Apto 301',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70322-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Portaria'],
                isPublished: true,
                views: 40,
                userId: users[1].id
            }
        ];
        console.log('🏠 Criando propriedades...');
        for (const property of properties) {
            const created = await prisma.property.create({
                data: {
                    ...property,
                    images: JSON.stringify(property.images),
                    features: JSON.stringify(property.features),
                }
            });
            console.log(`✅ ${created.title} - R$ ${created.price.toLocaleString('pt-BR')}`);
        }
        const additionalUsers = await Promise.all([
            prisma.user.create({
                data: {
                    name: 'Carlos Mendes',
                    email: 'carlos@exemplo.com',
                    phone: '(61) 99999-4444',
                    role: 'USER',
                    emailVerified: true
                }
            }),
            prisma.user.create({
                data: {
                    name: 'Lucia Ferreira',
                    email: 'lucia@exemplo.com',
                    phone: '(61) 99999-5555',
                    role: 'USER',
                    emailVerified: true
                }
            })
        ]);
        console.log(`👥 ${additionalUsers.length} usuários adicionais criados`);
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
        console.log('\n🎉 Seed de dados para página inicial concluído com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro ao criar dados:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
seedHomeData();
//# sourceMappingURL=seed-home-data.js.map