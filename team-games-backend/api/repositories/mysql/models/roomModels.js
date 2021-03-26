//const sql = require("./db.js");
const database = require('../../../config/databaseMySQL');
const mysql = require('mysql');
var q = require('q');

const connection = database.connections.accenture || mysql;

// CREATE TABLE IF NOT EXISTS `teamgames`.`room` (
//     `id` INT NOT NULL AUTO_INCREMENT,
//     `roomkey` VARCHAR(7) NULL,
//     `visibility` INT NULL DEFAULT 0,
//     PRIMARY KEY (`id`))


const basicQuery = `SELECT room.id, room.roomkey, room.visibility
         FROM room as room`;

// constructor
const Room = function (room) {
    this.id = room.id;
    this.roomkey = room.roomkey;
    this.visibility = room.visibility;
};

Room.create = async (room, result) => {
    var deferred = q.defer();
    var query = "INSERT INTO room (" + Object.keys(room).join(",") + ") VALUES (" + Object.values(room).map(function (x) { return typeof (x) === 'string' ? '"' + x + '"' : x; }).join(",") + ")";
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("roomModels created Room: ", { id: res.insertId, ...room });
        deferred.resolve({ id: res.insertId, ...room });
    });
    return deferred.promise;
};

Room.update = async (room, result) => {
    var deferred = q.defer();

    const columns = Object.keys(room);
    const values = Object.values(room);

    let query = "UPDATE room SET " + columns.join(" = ? ,") + " = ? WHERE id = " + room.id;

    const conn = await database.getConnection("accenture");
    conn.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("roomModels update Room: ", { ...room });
            deferred.resolve({ ...room });
        }

        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

Room.delete = async (id, result) => {
    var deferred = q.defer();

    let query = "DELETE FROM room WHERE id = " + id;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }
        if (res.affectedRows > 0) {
            console.log("roomModels delete Room: ", { id: id });
            deferred.resolve({ id: id });
        }

        deferred.resolve({ kind: "not_found" });

    });
    return deferred.promise;
};

Room.findById = async (id, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where room.roomkey = ${id}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found room: ", res[0]);
            deferred.resolve(res);
            return;
        }

        // not found room with the id
        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

Room.findByKeyRoom = async (id, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where room.roomkey like "${id}%"`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found room: ", res[0]);
            deferred.resolve(res[0]);
            return;
        }

        // not found room with the id
        deferred.resolve(undefined);
    });
    return deferred.promise;
};

module.exports = Room;