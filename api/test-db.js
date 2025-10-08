const { PrismaClient } = require('@prisma/client');

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Verificando dados no banco...');
    
    // Verificar usuários
    const users = await prisma.user.findMany();
    console.log('Usuários encontrados:', users.length);
    
    // Verificar propriedades
    const properties = await prisma.property.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    console.log('Propriedades encontradas:', properties.length);
    
    if (properties.length > 0) {
      console.log('Primeira propriedade:');
      console.log(JSON.stringify(properties[0], null, 2));
    }
    
    // Verificar se há propriedades publicadas
    const publishedProperties = await prisma.property.findMany({
      where: { isPublished: true },
    });
    console.log('Propriedades publicadas:', publishedProperties.length);
    
  } catch (error) {
    console.error('Erro ao verificar banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
