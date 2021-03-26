const teamModels = require('./models/teamModels');

class TeamRepository {
    constructor() {
        this.model = teamModels;
    }

    async findById(id) {
        let rs = {};
        try {
            rs = await this.model.findById(id);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute findById`};
        }
        return rs;
    }

    async create(team) {
        let rs = {};
        try {
            rs = await this.model.create(team);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute create`};
        }
        return rs;
    }

    async update(team) {
        let rs = {};
        try {
            rs = await this.model.update(team);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute update`};
        }
        return rs;
    }

    async delete(idTeam) {
        let rs = {};
        try {
            rs = await this.model.delete(idTeam);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute delete`};
        }
        return rs;
    }
    
    async insertUserInTeam(idUser, idTeam) {
        let rs = {};
        try {
            rs = await this.model.insertUserInTeam(idUser, idTeam);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute insertUserInTeam`};
        }
        return rs;
    }

    async deleteUserInTeam(idUser, idTeam) {
        let rs = {};
        try {
            rs = await this.model.deleteUserInTeam(idUser, idTeam);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute deleteUserInTeam`};
        }
        return rs;
    }

}

module.exports = TeamRepository;