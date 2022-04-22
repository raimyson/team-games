// const server = require('../../../app');
// const {full} = require('../../config/route').info(__filename);

// const Factory = require('../../config/factory');
// const Controller = require('./controller');
const { Server } = require("socket.io");
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
server.post(`${full}/create`, [middlewares.notEmptyBody], Factory.build(Controller, 'create'));
server.post(`${full}/update`, [middlewares.notEmptyBody], Factory.build(Controller, 'update'));
server.post(`${full}/delete`, [middlewares.notEmptyBody], Factory.build(Controller, 'delete'));
server.post(`${full}/insertUserInRoom`, [middlewares.notEmptyBody], Factory.build(Controller, 'insertUserInRoom'));
server.post(`${full}/deleteUserInRoom`, [middlewares.notEmptyBody], Factory.build(Controller, 'deleteUserInRoom'));
server.post(`${full}/findByRoom`, [middlewares.notEmptyBody], Factory.build(Controller, 'findByRoom'));
server.post(`${full}/enter`, [middlewares.notEmptyBody], Factory.build(Controller, 'enter'));


const io = new Server(server, { path: `/api/io/movingmotivators/socket` });
//const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});