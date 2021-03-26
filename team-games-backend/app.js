const config = require('./api/config');
const server = require('./api/config/server');
const {importModuleRoutes} = require('./api/config/provider');
//const database = require('./api/config/database');
const database = require('./api/config/databaseMySQL');
const databaseORC = require('./api/config/databaseOracle');
//const redis = require('./api/config/redis');

// const middlewares = require('./api/middlewares');

server.get('/', (req, res, next) => {
	console.log(`${config.app.projectName} está rodando!`);
	res.send(200, `${config.app.projectName} está rodando!`);
	return next();
});

server.listen(config.app.port, () => {
  //database.connect();
  //redis.configure();
  //databaseORC.connect();
  

	importModuleRoutes();

	console.log(`A aplicação [${config.app.projectName}] está rodando em modo [${config.app.env}] na porta [${config.app.port}].`);
});

server.on('close', () => {
	console.log('Aplicação:', 'O Servidor do restify foi finalizado.');

	// finaliza a conexão com o banco sempre que o restify for finalizado
  if(database.close()) {
    console.log('-', 'Conexão com o banco de dados foi finalizada.');
  }
  if(databaseORC.close()) {
    console.log('-', 'Conexão com o banco de dados foi finalizada.');
  }
  
  //if(redis && redis.client && redis.client.close()) {
    console.log('-', 'Conexão com o redis foi finalizada.');
  //}
});

// Finaliza a aplicação e todos os seus processos e conexões
process.on('SIGINT', () => {
  console.log('');
  console.log('Aplicação encerrada.');
  process.exit();
});

module.exports = server;
