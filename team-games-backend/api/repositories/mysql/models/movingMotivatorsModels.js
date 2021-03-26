//const sql = require("./db.js");
const database = require('../../../config/databaseMySQL');
const mysql = require('mysql');
var q = require('q');

const connection = database.connections.accenture || mysql;

// CREATE TABLE IF NOT EXISTS `teamgames`.`movingmotivators` (
//     `id` INT NOT NULL AUTO_INCREMENT,
//     `name` VARCHAR(255) NULL,
//     `email` VARCHAR(255) NULL,
//     `curiosity` INT NULL DEFAULT 1,
//     `curiositystatus` INT NULL DEFAULT 0,
//     `acceptance` INT NULL DEFAULT 2,
//     `acceptancestatus` INT NULL DEFAULT 0,
//     `power` INT NULL DEFAULT 3,
//     `powerstatus` INT NULL DEFAULT 0,
//     `relatedness` INT NULL DEFAULT 4,
//     `relatednessstatus` INT NULL DEFAULT 0,
//     `goal` INT NULL DEFAULT 5,
//     `goalstatus` INT NULL DEFAULT 0,
//     `honor` INT NULL DEFAULT 6,
//     `honorstatus` INT NULL DEFAULT 0,
//     `mastery` INT NULL DEFAULT 7,
//     `masterystatus` INT NULL DEFAULT 0,
//     `freedom` INT NULL DEFAULT 8,
//     `freedomstatus` INT NULL DEFAULT 0,
//     `order` INT NULL DEFAULT 9,
//     `orderstatus` INT NULL DEFAULT 0,
//     `status` INT NULL DEFAULT 10,
//     `statusstatus` INT NULL DEFAULT 0,
//     `roomid` INT NOT NULL,
//     PRIMARY KEY (`id`),
//     INDEX `fk_movingmotivators_room_idx` (`roomid` ASC) VISIBLE,
//     CONSTRAINT `fk_movingmotivators_room`
//       FOREIGN KEY (`roomid`)
//       REFERENCES `teamgames`.`room` (`id`)
//       ON DELETE NO ACTION
//       ON UPDATE NO ACTION)


const basicQuery = `SELECT *
         FROM movingmotivators as movingmotivators`;

// constructor
const MovingMotivators = function (movingmotivators) {
    this.id = movingmotivators.id;
    this.name = movingmotivators.name;
    this.email = movingmotivators.email;
    this.curiosity = movingmotivators.curiosity;
    this.curiositystatus = movingmotivators.curiositystatus;
    this.acceptance = movingmotivators.acceptance;
    this.acceptancestatus = movingmotivators.acceptancestatus;
    this.power = movingmotivators.power;
    this.powerstatus = movingmotivators.powerstatus;
    this.relatedness = movingmotivators.relatedness;
    this.relatednessstatus = movingmotivators.relatednessstatus;
    this.goal = movingmotivators.goal;
    this.goalstatus = movingmotivators.goalstatus;
    this.honor = movingmotivators.honor;
    this.honorstatus = movingmotivators.honorstatus;
    this.mastery = movingmotivators.mastery;
    this.masterystatus = movingmotivators.masterystatus;
    this.freedom = movingmotivators.freedom;
    this.freedomstatus = movingmotivators.freedomstatus;
    this.order = movingmotivators.order;
    this.orderstatus = movingmotivators.orderstatus;
    this.status = movingmotivators.status;
    this.statusstatus = movingmotivators.statusstatus;
    this.roomid = movingmotivators.roomid;
};

MovingMotivators.create = async (movingmotivators, result) => {
    var deferred = q.defer();
    var query = "INSERT INTO movingmotivators (" + Object.keys(movingmotivators).join(",") + ") VALUES (" + Object.values(movingmotivators).map(function (x) { return typeof (x) === 'string' ? '"' + x + '"' : x; }).join(",") + ")";
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("movingmotivatorsModels created MovingMotivators: ", { id: res.insertId, ...movingmotivators });
        deferred.resolve({ id: res.insertId, ...movingmotivators });
    });
    return deferred.promise;
};

MovingMotivators.update = async (movingmotivators, result) => {
    var deferred = q.defer();

    const columns = Object.keys(movingmotivators);
    const values = Object.values(movingmotivators);

    let query = "UPDATE movingmotivators SET " + columns.join(" = ?, ") + " = ? WHERE roomid = " + movingmotivators.roomid+" and name = '"+movingmotivators.name+"'";

    const conn = await database.getConnection("accenture");
    conn.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("movingmotivatorsModels update MovingMotivators: ", { ...movingmotivators });
            deferred.resolve({ ...movingmotivators });
        }

        deferred.resolve(undefined);
    });
    return deferred.promise;
};

MovingMotivators.delete = async (idMovingMotivators, result) => {
    var deferred = q.defer();

    let query = "DELETE FROM movingmotivators WHERE idMovingMotivators = " + idMovingMotivators;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }
        if (res.affectedRows > 0) {
            console.log("movingmotivatorsModels delete MovingMotivators: ", { idMovingMotivators: idMovingMotivators });
            deferred.resolve({ idMovingMotivators: idMovingMotivators });
        }

        deferred.resolve({ kind: "not_found" });

    });
    return deferred.promise;
};

MovingMotivators.findById = async (idMovingMotivators, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where movingmotivators.id = ${idMovingMotivators}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found movingmotivators: ", res[0]);
            deferred.resolve(res[0]);
            return;
        }

        // not found movingmotivators with the id
        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

MovingMotivators.insertUserInRoom = async (idUser, idMovingMotivators, result) => {
    var deferred = q.defer();
    var query = `INSERT INTO user_has_movingmotivators (idUser, idMovingMotivators) VALUES (${idUser}, ${idMovingMotivators})`;
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("movingmotivatorsModels insertUserInMovingMotivators MovingMotivators: ", { idUser: idUser, idMovingMotivators: idMovingMotivators });
        deferred.resolve({ idUser: idUser, idMovingMotivators: idMovingMotivators });
    });
    return deferred.promise;
};

MovingMotivators.deleteUserInRoom = async (user, roomid, result) => {
    var deferred = q.defer();
    var query = `DELETE FROM movingmotivators WHERE name='${user}' AND roomid=${roomid}`;
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("movingmotivatorsModels deleteUserInMovingMotivators MovingMotivators: ", { user, roomid });
            deferred.resolve({ user, roomid });
        }

        deferred.resolve(undefined);

    });
    return deferred.promise;
};

MovingMotivators.findByRoom = async (roomid, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where movingmotivators.roomid = ${roomid}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found movingmotivators: ", res[0]);
            deferred.resolve(res);
            return;
        }

        // not found movingmotivators with the id
        deferred.resolve(undefined);
    });
    return deferred.promise;
};

module.exports = MovingMotivators;