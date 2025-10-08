const http = require('http');

function testPropertyById() {
  const propertyId = 'cmgh4dtqg001pv2fo93dqqp0q'; // ID da primeira propriedade do teste anterior
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: `/api/properties/${propertyId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Resposta da API:');
      try {
        const parsed = JSON.parse(data);
        console.log(JSON.stringify(parsed, null, 2));
        
        if (parsed.success && parsed.data) {
          console.log(`\nPropriedade encontrada: ${parsed.data.title}`);
          console.log('Preço:', parsed.data.price);
          console.log('Imagens:', parsed.data.images);
        } else {
          console.log('Propriedade não encontrada ou erro na API');
        }
      } catch (error) {
        console.log('Erro ao fazer parse da resposta:', error.message);
        console.log('Resposta bruta:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erro na requisição:', error.message);
  });

  req.end();
}

console.log('Testando API para propriedade específica...');
testPropertyById();
