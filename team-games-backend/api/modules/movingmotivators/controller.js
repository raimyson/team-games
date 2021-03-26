const repository = require('../../repositories/mysql/movingMotivatorsRepository');

class MovingMotivatorsController {
    async findById(req, res, next) {
        console.log(`MovingMotivatorsController - findById - ${req.params}`);
        const team = new repository();
        const r = await team.findById(req.params.id);
        res.send(200, r);
        return next();
    }

    async create(req, res, next) {
        console.log(`MovingMotivatorsController - create - ${req.params}`);
        const team = new repository();
        const r = await team.create(req.params);
        res.send(200, r);
        return next();
    }

    async update(req, res, next) {
        console.log(`MovingMotivatorsController - update - ${req.params}`);
        const team = new repository();
        const r = await team.update(req.params);
        res.send(200, r);
        return next();
    }

    async delete(req, res, next) {
        console.log(`MovingMotivatorsController - delete - ${req.params}`);
        const team = new repository();
        const r = await team.delete(req.params.id);
        res.send(200, r);
        return next();
    }

    async insertUserInRoom(req, res, next) {
        console.log(`MovingMotivatorsController - insertUserInRoom - ${req.params}`);
        const team = new repository();
        const r = await team.insertUserInRoom(req.params.user, req.params.code);
        res.send(200, r);
        return next();
    }

    async deleteUserInRoom(req, res, next) {
        console.log(`MovingMotivatorsController - deleteUserInRoom - ${req.params}`);
        const team = new repository();
        const r = await team.deleteUserInRoom(req.params.user, req.params.roomid);
        res.send(200, r);
        return next();
    }

    async findByRoom(req, res, next) {
        console.log(`MovingMotivatorsController - findByRoom - ${req.params}`);
        const team = new repository();
        if (!req.params.code || req.params.code.length < 5){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const r = await team.findByRoom(req.params.code, req.params.name);
        if (!r){
            res.send(400, {"error":"Room não encontrada"});
            return next();
        }
        res.send(200, r);
        return next();
    }

    async enter(req, res, next) {
        console.log(`MovingMotivatorsController - enter - ${req.params}`);
        const team = new repository();
        if (!req.params.code || req.params.code.length < 5 || !req.params.name  || req.params.name.length < 3){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const r = await team.enter(req.params);
        if (!r){
            res.send(400, {"error":"Room não encontrada ou usuario cadastrado"});
            return next();
        }
        res.send(200, r);
        return next();
    }

}

module.exports = MovingMotivatorsController;