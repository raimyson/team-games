const config = require('.');

// Classe responsável por gerenciar a conexão com o banco de dados (MongoDB)
class Database {
	constructor() {
		this.config = config;
		this.connections = {};
		this.mongoose = require('mongoose');
		this.mongoose.Promise = Promise;
	}

	close(name) {
		try {
			Object.keys(this.connections).map(connection => {
				if (!name || connection.toLowerCase() == name.toLowerCase()) {
					this.connections[connection].close();
					delete this.connections[connection];
				}

				return connection;
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	connect() {
		if (this.config.mongodb) {
			Object.keys(this.config.mongodb).map(property => {
				// Singleton
				if (this.connections[property]) return;

				const config = this.config.mongodb[property];

				let url = config.host;
				if(config.port && config.database) {
					url = `${config.host}:${config.port}/${config.database}`
				}

				const connection = this.mongoose.createConnection(url, config.options);

				connection.on('connecting', () => {
					console.log(
						`Tentando conectar no banco de dados [${property}] [${url}]...`,
					);
				});

				connection.on('connected', () => {
					console.log(
						`Conectado com sucesso no banco de dados [${property}] [${url}]`,
					);
				});

				connection.on('close', () => {
					console.log(
						`A conexão com o banco de dados foi fechada [${property}] [${url}]`,
					);
				});

				connection.on('error', erro => {
					this.log.error(
						`Erro ao conectar com banco de dados [${property}] [${url}]`,
						erro,
					);
				});

				this.connections[property] = connection;
			});
		}
	}
}

module.exports = new Database();
