"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedProperties() {
    try {
        const users = await prisma.user.findMany();
        if (users.length === 0) {
            console.log('Nenhum usuário encontrado. Crie um usuário primeiro.');
            return;
        }
        const userId = users[0].id;
        const properties = [
            {
                title: 'Casa Moderna com 3 Quartos',
                description: 'Linda casa moderna com 3 quartos, 2 banheiros, área de lazer completa e garagem para 2 carros.',
                price: 450000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 120,
                address: 'Rua das Flores, 123',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01234-567',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'
                ],
                features: ['Piscina', 'Garagem', 'Jardim', 'Área de lazer'],
                isPublished: true,
                userId
            },
            {
                title: 'Apartamento Luxo no Centro',
                description: 'Apartamento de luxo no centro da cidade, com vista panorâmica e acabamento de primeira.',
                price: 650000,
                type: 'APARTAMENTO',
                bedrooms: 2,
                bathrooms: 2,
                area: 85,
                address: 'Av. Paulista, 1000',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '01310-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
                ],
                features: ['Portaria 24h', 'Academia', 'Piscina', 'Salão de festas'],
                isPublished: true,
                userId
            },
            {
                title: 'Terreno Comercial Estratégico',
                description: 'Terreno comercial em localização estratégica, ideal para construção de estabelecimento comercial.',
                price: 280000,
                type: 'COMERCIAL',
                area: 200,
                address: 'Rua Comercial, 456',
                city: 'São Paulo',
                state: 'SP',
                zipCode: '04567-890',
                images: [
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
                ],
                features: ['Localização estratégica', 'Fácil acesso'],
                isPublished: true,
                userId
            }
        ];
        for (const property of properties) {
            const created = await prisma.property.create({
                data: {
                    ...property,
                    images: JSON.stringify(property.images),
                    features: JSON.stringify(property.features),
                }
            });
            console.log(`Propriedade criada: ${created.title} (ID: ${created.id})`);
        }
        console.log('Seed de propriedades concluído!');
    }
    catch (error) {
        console.error('Erro ao criar propriedades:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
seedProperties();
//# sourceMappingURL=seed-properties.js.map