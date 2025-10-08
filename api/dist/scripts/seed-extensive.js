"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedExtensive() {
    try {
        console.log('🌱 Iniciando seed extensivo com mais de 20 propriedades...');
        await prisma.property.deleteMany();
        await prisma.user.deleteMany();
        console.log('🧹 Dados existentes removidos');
        const users = await Promise.all([
            prisma.user.create({
                data: {
                    name: 'Maria Silva Santos',
                    email: 'maria@exemplo.com',
                    phone: '(61) 99999-1111',
                    role: 'PROPRIETARIO',
                    emailVerified: true
                }
            }),
            prisma.user.create({
                data: {
                    name: 'João Carlos Mendes',
                    email: 'joao@exemplo.com',
                    phone: '(61) 99999-2222',
                    role: 'CORRETOR',
                    emailVerified: true
                }
            }),
            prisma.user.create({
                data: {
                    name: 'Ana Costa Lima',
                    email: 'ana@exemplo.com',
                    phone: '(61) 99999-3333',
                    role: 'INCORPORADORA',
                    emailVerified: true
                }
            }),
            prisma.user.create({
                data: {
                    name: 'Carlos Eduardo Ferreira',
                    email: 'carlos@exemplo.com',
                    phone: '(61) 99999-4444',
                    role: 'CORRETOR',
                    emailVerified: true
                }
            }),
            prisma.user.create({
                data: {
                    name: 'Lucia Helena Rodrigues',
                    email: 'lucia@exemplo.com',
                    phone: '(61) 99999-5555',
                    role: 'PROPRIETARIO',
                    emailVerified: true
                }
            }),
            prisma.user.create({
                data: {
                    name: 'Roberto Almeida',
                    email: 'roberto@exemplo.com',
                    phone: '(61) 99999-6666',
                    role: 'INCORPORADORA',
                    emailVerified: true
                }
            })
        ]);
        console.log(`✅ ${users.length} usuários criados`);
        const properties = [
            {
                title: 'Mansão Moderna no Lago Sul',
                description: 'Exclusiva mansão moderna no Lago Sul com vista panorâmica para o lago, 5 quartos, 4 banheiros, área de lazer completa com piscina, sauna, academia e jardim paisagístico.',
                price: 2500000,
                type: 'CASA',
                bedrooms: 5,
                bathrooms: 4,
                area: 450,
                address: 'SHIS QI 15, Conjunto 5, Casa 12',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71640-125',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
                ],
                features: ['Piscina', 'Sauna', 'Academia', 'Jardim paisagístico', 'Garagem para 4 carros', 'Área de lazer', 'Vista para o lago', 'Sistema de segurança'],
                isPublished: true,
                views: 250,
                userId: users[0].id
            },
            {
                title: 'Apartamento Penthouse de Luxo',
                description: 'Penthouse de luxo na Asa Norte com 4 quartos, 3 banheiros, varanda gourmet de 50m², acabamento de primeira qualidade e vista panorâmica da cidade.',
                price: 1800000,
                type: 'APARTAMENTO',
                bedrooms: 4,
                bathrooms: 3,
                area: 180,
                address: 'SQS 115, Bloco A, Apto 1501',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70377-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop'
                ],
                features: ['Portaria 24h', 'Academia', 'Piscina', 'Salão de festas', 'Varanda gourmet', 'Vista panorâmica', 'Sistema de ar condicionado central'],
                isPublished: true,
                views: 200,
                userId: users[1].id
            },
            {
                title: 'Casa Colonial Restaurada',
                description: 'Casa colonial restaurada no Plano Piloto com 4 quartos, 3 banheiros, piscina, área de lazer completa e jardim histórico preservado.',
                price: 1200000,
                type: 'CASA',
                bedrooms: 4,
                bathrooms: 3,
                area: 220,
                address: 'SQN 108, Bloco A, Casa 15',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70733-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
                ],
                features: ['Piscina', 'Área de lazer', 'Garagem para 3 carros', 'Jardim histórico', 'Localização privilegiada', 'Acabamento colonial'],
                isPublished: true,
                views: 180,
                userId: users[0].id
            },
            {
                title: 'Casa Nova no Guará II',
                description: 'Casa nova no Guará II com 3 quartos, 2 banheiros, área de lazer, garagem para 2 carros e acabamento moderno.',
                price: 450000,
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
                features: ['Área de lazer', 'Garagem', 'Jardim', 'Acabamento moderno'],
                isPublished: true,
                views: 25,
                userId: users[2].id
            },
            {
                title: 'Apartamento Moderno no Taguatinga',
                description: 'Apartamento moderno no Taguatinga com 2 quartos, 1 banheiro, varanda e acabamento contemporâneo.',
                price: 380000,
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
                features: ['Varanda', 'Portaria', 'Acabamento contemporâneo'],
                isPublished: true,
                views: 15,
                userId: users[1].id
            },
            {
                title: 'Casa no Núcleo Bandeirante',
                description: 'Casa aconchegante no Núcleo Bandeirante com 2 quartos, 1 banheiro, quintal e garagem.',
                price: 320000,
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
                features: ['Quintal', 'Garagem', 'Localização tranquila'],
                isPublished: true,
                views: 10,
                userId: users[0].id
            },
            {
                title: 'Apartamento no Cruzeiro Novo',
                description: 'Apartamento no Cruzeiro Novo com 2 quartos, 1 banheiro, varanda e localização central.',
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
                features: ['Varanda', 'Portaria', 'Localização central'],
                isPublished: true,
                views: 20,
                userId: users[3].id
            },
            {
                title: 'Apartamento 1 Quarto - Ceilândia',
                description: 'Apartamento econômico na Ceilândia com 1 quarto, 1 banheiro, varanda e portaria.',
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
                features: ['Varanda', 'Portaria', 'Preço acessível'],
                isPublished: true,
                views: 45,
                userId: users[1].id
            },
            {
                title: 'Casa Popular no Recanto das Emas',
                description: 'Casa popular no Recanto das Emas com 2 quartos, 1 banheiro, quintal e garagem.',
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
                features: ['Quintal', 'Garagem', 'Preço acessível'],
                isPublished: true,
                views: 35,
                userId: users[2].id
            },
            {
                title: 'Apartamento 2 Quartos - Samambaia',
                description: 'Apartamento em Samambaia com 2 quartos, 1 banheiro, varanda e portaria.',
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
                features: ['Varanda', 'Portaria', 'Preço acessível'],
                isPublished: true,
                views: 30,
                userId: users[1].id
            },
            {
                title: 'Casa no Riacho Fundo',
                description: 'Casa no Riacho Fundo com 2 quartos, 1 banheiro, quintal e garagem.',
                price: 280000,
                type: 'CASA',
                bedrooms: 2,
                bathrooms: 1,
                area: 80,
                address: 'QR 1, Conjunto 1, Casa 12',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71800-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Quintal', 'Garagem', 'Localização tranquila'],
                isPublished: true,
                views: 25,
                userId: users[0].id
            },
            {
                title: 'Casa no Sudoeste',
                description: 'Casa moderna no Sudoeste com 3 quartos, 2 banheiros, área de lazer e garagem para 2 carros.',
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
                features: ['Área de lazer', 'Garagem', 'Jardim', 'Localização privilegiada'],
                isPublished: true,
                views: 60,
                userId: users[0].id
            },
            {
                title: 'Apartamento no Águas Claras',
                description: 'Apartamento no Águas Claras com 2 quartos, 1 banheiro, varanda e portaria 24h.',
                price: 480000,
                type: 'APARTAMENTO',
                bedrooms: 2,
                bathrooms: 1,
                area: 75,
                address: 'AR 8, Conjunto 2, Apto 401',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71900-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Portaria 24h', 'Academia', 'Piscina'],
                isPublished: true,
                views: 55,
                userId: users[1].id
            },
            {
                title: 'Casa no Sudoeste - Luxo',
                description: 'Casa de luxo no Sudoeste com 4 quartos, 3 banheiros, piscina, área de lazer completa e garagem para 3 carros.',
                price: 950000,
                type: 'CASA',
                bedrooms: 4,
                bathrooms: 3,
                area: 200,
                address: 'SQSW 105, Bloco B, Casa 12',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70680-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
                ],
                features: ['Piscina', 'Área de lazer', 'Garagem para 3 carros', 'Jardim', 'Sistema de segurança'],
                isPublished: true,
                views: 85,
                userId: users[4].id
            },
            {
                title: 'Apartamento no Lago Norte',
                description: 'Apartamento no Lago Norte com 3 quartos, 2 banheiros, varanda e vista para o lago.',
                price: 720000,
                type: 'APARTAMENTO',
                bedrooms: 3,
                bathrooms: 2,
                area: 110,
                address: 'SHIN QI 5, Conjunto 2, Apto 801',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71505-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Vista para o lago', 'Portaria 24h', 'Academia', 'Piscina'],
                isPublished: true,
                views: 70,
                userId: users[3].id
            },
            {
                title: 'Sala Comercial no Centro',
                description: 'Sala comercial no centro de Brasília, ideal para escritórios, consultórios ou comércio.',
                price: 350000,
                type: 'COMERCIAL',
                area: 80,
                address: 'SCS 102, Bloco A, Sala 201',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70322-100',
                images: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
                ],
                features: ['Localização central', 'Fácil acesso', 'Estacionamento', 'Segurança 24h'],
                isPublished: true,
                views: 40,
                userId: users[5].id
            },
            {
                title: 'Loja Comercial no Taguatinga',
                description: 'Loja comercial no Taguatinga, ideal para comércio, com estacionamento e localização estratégica.',
                price: 280000,
                type: 'COMERCIAL',
                area: 60,
                address: 'QNA 15, Conjunto A, Loja 5',
                city: 'Brasília',
                state: 'DF',
                zipCode: '72115-150',
                images: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
                ],
                features: ['Localização estratégica', 'Estacionamento', 'Fácil acesso', 'Segurança'],
                isPublished: true,
                views: 30,
                userId: users[5].id
            },
            {
                title: 'Terreno Residencial no Guará',
                description: 'Terreno residencial no Guará, ideal para construção de casa, com documentação em dia.',
                price: 180000,
                type: 'TERRENO',
                area: 300,
                address: 'QE 23, Conjunto A, Lote 15',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71020-230',
                images: [
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
                ],
                features: ['Documentação em dia', 'Fácil acesso', 'Localização privilegiada'],
                isPublished: true,
                views: 35,
                userId: users[2].id
            },
            {
                title: 'Terreno Comercial no Plano Piloto',
                description: 'Terreno comercial no Plano Piloto, ideal para construção de estabelecimento comercial.',
                price: 450000,
                type: 'TERRENO',
                area: 150,
                address: 'SQN 108, Bloco A, Lote 8',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70733-100',
                images: [
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
                ],
                features: ['Localização estratégica', 'Fácil acesso', 'Documentação em dia'],
                isPublished: true,
                views: 50,
                userId: users[5].id
            },
            {
                title: 'Chácara no Entorno',
                description: 'Chácara no entorno de Brasília com 5 hectares, casa sede, área de lazer e potencial para agropecuária.',
                price: 800000,
                type: 'RURAL',
                area: 50000,
                address: 'Zona Rural, Entorno de Brasília',
                city: 'Brasília',
                state: 'DF',
                zipCode: '00000-000',
                images: [
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'
                ],
                features: ['Casa sede', 'Área de lazer', 'Poço artesiano', 'Energia elétrica', 'Estrada de acesso'],
                isPublished: true,
                views: 60,
                userId: users[4].id
            },
            {
                title: 'Apartamento 3 Quartos - Asa Sul',
                description: 'Apartamento na Asa Sul com 3 quartos, 2 banheiros, varanda e portaria 24h.',
                price: 580000,
                type: 'APARTAMENTO',
                bedrooms: 3,
                bathrooms: 2,
                area: 95,
                address: 'SQS 208, Bloco B, Apto 203',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70258-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda', 'Portaria 24h', 'Academia', 'Piscina'],
                isPublished: true,
                views: 65,
                userId: users[1].id
            },
            {
                title: 'Casa no Lago Sul - Padrão Alto',
                description: 'Casa no Lago Sul com 4 quartos, 3 banheiros, piscina, área de lazer e garagem para 3 carros.',
                price: 1500000,
                type: 'CASA',
                bedrooms: 4,
                bathrooms: 3,
                area: 300,
                address: 'SHIS QI 15, Conjunto 5, Casa 8',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71640-125',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
                ],
                features: ['Piscina', 'Área de lazer', 'Garagem para 3 carros', 'Jardim', 'Vista para o lago', 'Sistema de segurança'],
                isPublished: true,
                views: 120,
                userId: users[0].id
            },
            {
                title: 'Apartamento no Sudoeste - Luxo',
                description: 'Apartamento de luxo no Sudoeste com 3 quartos, 2 banheiros, varanda gourmet e acabamento de primeira.',
                price: 850000,
                type: 'APARTAMENTO',
                bedrooms: 3,
                bathrooms: 2,
                area: 120,
                address: 'SQSW 105, Bloco B, Apto 401',
                city: 'Brasília',
                state: 'DF',
                zipCode: '70680-100',
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
                ],
                features: ['Varanda gourmet', 'Portaria 24h', 'Academia', 'Piscina', 'Salão de festas', 'Acabamento de primeira'],
                isPublished: true,
                views: 90,
                userId: users[3].id
            },
            {
                title: 'Casa no Águas Claras - Moderna',
                description: 'Casa moderna no Águas Claras com 3 quartos, 2 banheiros, área de lazer e garagem para 2 carros.',
                price: 520000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 130,
                address: 'AR 8, Conjunto 2, Casa 12',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71900-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Área de lazer', 'Garagem', 'Jardim', 'Acabamento moderno'],
                isPublished: true,
                views: 50,
                userId: users[2].id
            },
            {
                title: 'Apartamento no Cruzeiro - Vista Panorâmica',
                description: 'Apartamento no Cruzeiro com 2 quartos, 1 banheiro, varanda com vista panorâmica e portaria 24h.',
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
                features: ['Varanda', 'Vista panorâmica', 'Portaria 24h', 'Localização central'],
                isPublished: true,
                views: 40,
                userId: users[1].id
            },
            {
                title: 'Casa no Núcleo Bandeirante - Reformada',
                description: 'Casa reformada no Núcleo Bandeirante com 3 quartos, 2 banheiros, quintal e garagem.',
                price: 380000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 110,
                address: 'Rua 15, Lote 25',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71705-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Quintal', 'Garagem', 'Reformada', 'Localização tranquila'],
                isPublished: true,
                views: 30,
                userId: users[0].id
            },
            {
                title: 'Apartamento no Taguatinga - Conforto',
                description: 'Apartamento confortável no Taguatinga com 2 quartos, 1 banheiro, varanda e portaria.',
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
                features: ['Varanda', 'Portaria', 'Conforto', 'Localização estratégica'],
                isPublished: true,
                views: 25,
                userId: users[1].id
            },
            {
                title: 'Casa no Riacho Fundo - Ampliada',
                description: 'Casa ampliada no Riacho Fundo com 3 quartos, 2 banheiros, quintal e garagem para 2 carros.',
                price: 350000,
                type: 'CASA',
                bedrooms: 3,
                bathrooms: 2,
                area: 100,
                address: 'QR 1, Conjunto 1, Casa 12',
                city: 'Brasília',
                state: 'DF',
                zipCode: '71800-100',
                images: [
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
                ],
                features: ['Quintal', 'Garagem para 2 carros', 'Ampliada', 'Localização tranquila'],
                isPublished: true,
                views: 35,
                userId: users[0].id
            }
        ];
        console.log('🏠 Criando propriedades...');
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
        const totalProperties = await prisma.property.count();
        const publishedProperties = await prisma.property.count({ where: { isPublished: true } });
        const totalUsers = await prisma.user.count();
        const totalViews = await prisma.property.aggregate({
            _sum: { views: true }
        });
        const propertiesByType = await prisma.property.groupBy({
            by: ['type'],
            _count: { type: true }
        });
        const priceRanges = {
            'até R$ 300.000': await prisma.property.count({ where: { price: { lte: 300000 } } }),
            'R$ 300.000 a R$ 600.000': await prisma.property.count({ where: { price: { gt: 300000, lte: 600000 } } }),
            'R$ 600.000 a R$ 1.000.000': await prisma.property.count({ where: { price: { gt: 600000, lte: 1000000 } } }),
            'acima de R$ 1.000.000': await prisma.property.count({ where: { price: { gt: 1000000 } } })
        };
        console.log('\n📊 Estatísticas finais:');
        console.log(`🏠 Total de propriedades: ${totalProperties}`);
        console.log(`✅ Propriedades publicadas: ${publishedProperties}`);
        console.log(`👥 Total de usuários: ${totalUsers}`);
        console.log(`👀 Total de visualizações: ${totalViews._sum.views || 0}`);
        console.log('\n📈 Propriedades por tipo:');
        propertiesByType.forEach(type => {
            console.log(`  ${type.type}: ${type._count.type}`);
        });
        console.log('\n💰 Propriedades por faixa de preço:');
        Object.entries(priceRanges).forEach(([range, count]) => {
            console.log(`  ${range}: ${count}`);
        });
        console.log('\n🎉 Seed extensivo concluído! Agora você tem mais de 25 propriedades variadas!');
        console.log('📱 A página inicial e a página de imóveis terão dados reais da API!');
    }
    catch (error) {
        console.error('❌ Erro ao criar dados:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
seedExtensive();
//# sourceMappingURL=seed-extensive.js.map