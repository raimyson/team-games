//const sql = require("./db.js");
const database = require('../../../config/databaseMySQL');
const mysql = require('mysql');
var q = require('q');

const connection = database.connections.accenture || mysql;


const basicQuery = `SELECT player.id, player.name, player.email, player.admin, player.roomid
         FROM player as player`;

// constructor
const Player = function (player) {
    this.id = player.id;
    this.name = player.name;
    this.email = player.email;
    this.admin = player.admin;
    this.roomid = player.roomid;
};

Player.create = async (player, result) => {
    var deferred = q.defer();
    var query = "INSERT INTO player (" + Object.keys(player).join(",") + ") VALUES (" + Object.values(player).map(function (x) { return typeof (x) === 'string' ? '"' + x + '"' : x; }).join(",") + ")";
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("PlayerModels created Player: ", { id: res.insertId, ...player });
        deferred.resolve({ id: res.insertId, ...player });
    });
    return deferred.promise;
};

Player.findByRoom = async (roomid, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where player.roomid = ${roomid}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found PlayerModels: ", res[0]);
            deferred.resolve(res);
            return;
        }

        // not found movingmotivators with the id
        deferred.resolve(undefined);
    });
    return deferred.promise;
};


module.exports = Player;