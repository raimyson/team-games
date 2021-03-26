//const sql = require("./db.js");
const database = require('../../../config/databaseMySQL');
const mysql = require('mysql');
var q = require('q');

const connection = database.connections.accenture || mysql;


const basicQuery = `SELECT *
         FROM delegationpoker as delegationpoker`;

// constructor
const DelegationPoker = function (delegationpoker) {
    this.id = delegationpoker.id;
    this.decision = delegationpoker.decision;
    this.visibility = delegationpoker.visibility;
    this.roomid = delegationpoker.roomid;
};

DelegationPoker.create = async (delegationpoker, result) => {
    var deferred = q.defer();
    var query = "INSERT INTO delegationpoker (" + Object.keys(delegationpoker).join(",") + ") VALUES (" + Object.values(delegationpoker).map(function (x) { return typeof (x) === 'string' ? '"' + x + '"' : x; }).join(",") + ")";
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("DelegationPokerModels created Delegationpoker: ", { id: res.insertId, ...delegationpoker });
        deferred.resolve({ id: res.insertId, ...delegationpoker });
    });
    return deferred.promise;
};

DelegationPoker.findByRoom = async (roomid, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where delegationpoker.roomid = ${roomid}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("DelegationPokerModels findByRoom: ", res);
            deferred.resolve(res);
            return;
        }

        // not found movingmotivators with the id
        deferred.resolve([]);
    });
    return deferred.promise;
};

DelegationPoker.findPlayerByRoom = async (delegationpokerid, result) => {
    var deferred = q.defer();
    const query = `SELECT dp.*, p.name FROM delegationpoker_has_player dp, player p where dp.playerid = p.id and delegationpokerid = ${delegationpokerid}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("DelegationPokerModels findPlayerByRoom: ", res);
            deferred.resolve(res);
            return;
        }

        // not found movingmotivators with the id
        deferred.resolve([]);
    });
    return deferred.promise;
};

DelegationPoker.delete = async (delegationpokerid, result) => {
    var deferred = q.defer();

    let query = "DELETE FROM delegationpoker WHERE id = " + delegationpokerid;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }
        if (res.affectedRows > 0) {
            console.log("DelegationPokerModels delete: ", { id: delegationpokerid });
            deferred.resolve({ id: delegationpokerid });
        }

        deferred.resolve(undefined);

    });
    return deferred.promise;
};

DelegationPoker.removePlayerByRoom = async (delegationpokerid, result) => {
    var deferred = q.defer();
    const query = `DELETE FROM delegationpoker_has_player where delegationpokerid = ${delegationpokerid}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("DelegationPokerModels delete: ", { id: delegationpokerid });
            deferred.resolve({ id: delegationpokerid });
        }

        // not found movingmotivators with the id
        deferred.resolve(undefined);
    });
    return deferred.promise;
};

DelegationPoker.update = async (delegationpoker, result) => {
    var deferred = q.defer();

    const columns = Object.keys(delegationpoker);
    const values = Object.values(delegationpoker);

    let query = "UPDATE delegationpoker SET " + columns.join(" = ?, ") + " = ? WHERE id = " + delegationpoker.id;

    const conn = await database.getConnection("accenture");
    conn.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("DelegationPokerModels update : ", { ...delegationpoker });
            deferred.resolve({ ...delegationpoker });
        }

        deferred.resolve(undefined);
    });
    return deferred.promise;
};

DelegationPoker.updateCard = async (delegationpoker, result) => {
    var deferred = q.defer();

    const columns = Object.keys(delegationpoker);
    const values = Object.values(delegationpoker);

    let query = "UPDATE delegationpoker_has_player SET " + columns.join(" = ?, ") + " = ? WHERE delegationpokerid = " + delegationpoker.delegationpokerid+" and playerid = '"+delegationpoker.playerid+"'";

    const conn = await database.getConnection("accenture");
    conn.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("DelegationPokerModels update card: ", { ...delegationpoker });
            deferred.resolve({ ...delegationpoker });
        }

        deferred.resolve(undefined);
    });
    return deferred.promise;
};

DelegationPoker.createCard = async (delegationpoker, result) => {
    var deferred = q.defer();
    var query = "INSERT INTO delegationpoker_has_player (" + Object.keys(delegationpoker).join(",") + ") VALUES (" + Object.values(delegationpoker).map(function (x) { return typeof (x) === 'string' ? '"' + x + '"' : x; }).join(",") + ")";
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("DelegationPokerModels created card: ", { id: res.insertId, ...delegationpoker });
        deferred.resolve({ id: res.insertId, ...delegationpoker });
    });
    return deferred.promise;
};




module.exports = DelegationPoker;