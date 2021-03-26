const config = require('.');
var q = require('q');

// Classe responsável por gerenciar a conexão com o banco de dados (MongoDB)
class DatabaseOracle {
	constructor() {
		this.config = config;
		this.connections = {};
		this.oracle = require('oracledb');
		this.oracle.Promise = Promise;
	}

	close(name) {
		try {
			Object.keys(this.connections).map(connection => {
				if (!name || connection.toLowerCase() == name.toLowerCase()) {
					this.connections[connection].end(function (err) {
						if (err) {
							return console.log('Error ao fechar conexão com o banco de dados foi fechada [${property}] [${url}]:' + err.message);
						}
						console.log(
							`A conexão com o banco de dados foi fechada [${property}] [${url}]`,
						);
					});
					delete this.connections[connection];
				}

				return connection;
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	async anAsyncFunction (property) {
		try {
			await this.oracle.createPool(this.config.oracle[property]);
			this.oracle.fetchAsString = [ this.oracle.CLOB ];
			let connection = await this.oracle.getConnection();
			return Promise.resolve(this.connections[property] = connection);
		} catch (error) {
			console.log(`${module} - ${error}`);
		}
	  }

	async connect() {
		if (this.config.oracle) {
			return Promise.all(Object.keys(this.config.oracle).map(property => this.anAsyncFunction(property)));
		}
	}

	async getConnection(name) {
		var deferred = q.defer();
		if (this.connections[name] == undefined || this.connections[name].oracleServerVersionString == undefined) {
			await this.connect();
			deferred.resolve(this.connections[name]);
		} else {
			deferred.resolve(this.connections[name]);
		}
		return deferred.promise;
	}
}

module.exports = new DatabaseOracle();
