const repository = require('../../repositories/mysql/delegationPokerRepository');

class DelegationPokerController {
   

    async create(req, res, next) {
        console.log(`DelegationPokerController - create - ${req.params}`);
        const repos = new repository();
        const r = await repos.create(req.params);
        res.send(200, r);
        return next();
    }

    async findByRoom(req, res, next) {
        console.log(`DelegationPokerController - findByRoom - ${req.params}`);
        const repos = new repository();
        if (!req.params.code || req.params.code.length < 5){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const r = await repos.findByRoom(req.params.code, req.params.name);
        if (!r){
            res.send(400, {"error":"Room não encontrada"});
            return next();
        }
        res.send(200, r);
        return next();
    }

    async enter(req, res, next) {
        console.log(`DelegationPokerController - enter - ${req.params}`);
        if (!req.params.code || req.params.code.length < 5 || !req.params.name  || req.params.name.length < 3){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const repos = new repository();
        const r = await repos.enter(req.params);
        if (!r){
            res.send(400, {"error":"Room não encontrada ou usuario cadastrado"});
            return next();
        }
        res.send(200, r);
        return next();
    }

    async createDecision(req, res, next) {
        console.log(`DelegationPokerController - createDecision - ${req.params}`);
        if (!req.params.code || req.params.code.length < 5 || !req.params.name  || req.params.name.length < 3){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const repos = new repository();
        const r = await repos.createDecision(req.params);
        res.send(200, r);
        return next();
    }

    async removeDecision(req, res, next) {
        console.log(`DelegationPokerController - removeDecision - ${req.params}`);
        if (!req.params.code || req.params.code.length < 5 || !req.params.name  || req.params.name.length < 3){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const repos = new repository();
        const r = await repos.removeDecision(req.params);
        res.send(200, r);
        return next();
    }

    async startDecision(req, res, next) {
        console.log(`DelegationPokerController - startDecision - ${req.params}`);
        if (!req.params.code || req.params.code.length < 5 || !req.params.name  || req.params.name.length < 3){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const repos = new repository();
        const r = await repos.startDecision(req.params);
        res.send(200, r);
        return next();
    }

    async associateCard(req, res, next) {
        console.log(`DelegationPokerController - associateCard - ${req.params}`);
        if (!req.params.code || req.params.code.length < 5 || !req.params.name  || req.params.name.length < 3){
            res.send(400, {"error":"Parametro inválido"});
            return next();
        }
        const repos = new repository();
        const r = await repos.associateCard(req.params);
        res.send(200, r);
        return next();
    }


}

module.exports = DelegationPokerController;