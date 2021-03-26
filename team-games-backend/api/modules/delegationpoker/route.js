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


server.post(`${full}/create`, [middlewares.notEmptyBody], Factory.build(Controller, 'create'));
server.post(`${full}/findByRoom`, [middlewares.notEmptyBody], Factory.build(Controller, 'findByRoom'));
server.post(`${full}/enter`, [middlewares.notEmptyBody], Factory.build(Controller, 'enter'));
server.post(`${full}/createDecision`, [middlewares.notEmptyBody], Factory.build(Controller, 'createDecision'));
server.post(`${full}/removeDecision`, [middlewares.notEmptyBody], Factory.build(Controller, 'removeDecision'));
server.post(`${full}/startDecision`, [middlewares.notEmptyBody], Factory.build(Controller, 'startDecision'));
server.post(`${full}/associateCard`, [middlewares.notEmptyBody], Factory.build(Controller, 'associateCard'));