const teamRepository = require('../../repositories/mysql/teamRepository');

class TeamController {
    async findById(req, res, next) {
        console.log(`TeamController - findById - ${req.params}`);
        const team = new teamRepository();
        const r = await team.findById(req.params.idTeam);
        res.send(200, r);
        return next();
    }

    async findByName(req, res, next) {
        console.log(`TeamController - findByName - ${req.params}`);
        const team = new teamRepository();
        const r = await team.findByName(req.params.name);
        res.send(200, r);
        return next();
    }

    async findAll(req, res, next) {
        console.log(`TeamController - findAll - ${req.params}`);
        const r = {msg: 'TeamController - findAll'};
        res.send(200, r);
        return next();
    }

    async findByUser(req, res, next) {
        console.log(`TeamController - findByUser - ${req.params}`);
        const team = new teamRepository();
        const r = await team.findByUser(req.params.idUser);
        res.send(200, r);
        return next();
    }

    async create(req, res, next) {
        console.log(`TeamController - create - ${req.params}`);
        const team = new teamRepository();
        const r = await team.create(req.params.team);
        res.send(200, r);
        return next();
    }

    async update(req, res, next) {
        console.log(`TeamController - update - ${req.params}`);
        const team = new teamRepository();
        const r = await team.update(req.params.team);
        res.send(200, r);
        return next();
    }

    async delete(req, res, next) {
        console.log(`TeamController - delete - ${req.params}`);
        const team = new teamRepository();
        const r = await team.delete(req.params.idTeam);
        res.send(200, r);
        return next();
    }

    async insertUserInTeam(req, res, next) {
        console.log(`TeamController - insertUserInTeam - ${req.params}`);
        const team = new teamRepository();
        const r = await team.insertUserInTeam(req.params.idUser, req.params.idTeam);
        res.send(200, r);
        return next();
    }

    async deleteUserInTeam(req, res, next) {
        console.log(`TeamController - deleteUserInTeam - ${req.params}`);
        const team = new teamRepository();
        const r = await team.deleteUserInTeam(req.params.idUser, req.params.idTeam);
        res.send(200, r);
        return next();
    }

}

module.exports = TeamController;