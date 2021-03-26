// const server = require('../../../app');
// const {full} = require('../../config/route').info(__filename);

// const Factory = require('../../config/factory');
// const Controller = require('./controller');

const middlewares = require('../../middlewares');

const {
    full,
    Factory,
    server,
    Controller,
    useMethod,
    useController
} = require('../../config/provider').provider(__filename);

server.post(`${full}/findById`, [middlewares.notEmptyBody], Factory.build(Controller, 'findById'));
server.post(`${full}/findByName`, [middlewares.notEmptyBody], Factory.build(Controller, 'findByName'));
server.post(`${full}/findAll`, [], Factory.build(Controller, 'findAll'));
server.post(`${full}/findByUser`, [middlewares.notEmptyBody], Factory.build(Controller, 'findByUser'));
server.post(`${full}/create`, [middlewares.notEmptyBody], Factory.build(Controller, 'create'));
server.post(`${full}/update`, [middlewares.notEmptyBody], Factory.build(Controller, 'update'));
server.post(`${full}/delete`, [middlewares.notEmptyBody], Factory.build(Controller, 'delete'));
server.post(`${full}/insertUserInTeam`, [middlewares.notEmptyBody], Factory.build(Controller, 'insertUserInTeam'));
server.post(`${full}/deleteUserInTeam`, [middlewares.notEmptyBody], Factory.build(Controller, 'deleteUserInTeam'));
