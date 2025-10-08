const { PrismaClient } = require('@prisma/client');

async function testProperty() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testando consulta da propriedade...');
    
    const property = await prisma.property.findUnique({
      where: { id: 'cmgh4dtqg001pv2fo93dqqp0q' },
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

    console.log('🔍 Propriedade encontrada:', property);
    
    if (property) {
      console.log('🔍 property.images:', property.images);
      console.log('🔍 property.features:', property.features);
      console.log('🔍 typeof property.images:', typeof property.images);
      console.log('🔍 typeof property.features:', typeof property.features);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testProperty();
