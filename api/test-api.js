const http = require('http');

function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/properties?page=1&limit=6',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Resposta da API:');
      try {
        const parsed = JSON.parse(data);
        console.log(JSON.stringify(parsed, null, 2));
        
        if (parsed.success && parsed.data && parsed.data.properties) {
          console.log(`\nPropriedades encontradas: ${parsed.data.properties.length}`);
          console.log('Dados de paginação:', parsed.data.pagination);
          if (parsed.data.properties.length > 0) {
            console.log('Primeira propriedade:');
            console.log(JSON.stringify(parsed.data.properties[0], null, 2));
          }
        } else {
          console.log('Estrutura de resposta inesperada');
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

console.log('Testando API...');
testAPI();
