//const sql = require("./db.js");
const database = require('../../../config/databaseMySQL');
const mysql = require('mysql');
var q = require('q');

const connection = database.connections.accenture || mysql;

// CREATE TABLE `team` (
//     `idTeam` int NOT NULL AUTO_INCREMENT,
//     `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//     `site` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
//     PRIMARY KEY (`idTeam`)
//   ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


const basicQuery = `SELECT team.idTeam, team.name, team.site, team.status
         FROM team as team`;

// constructor
const Team = function (team) {
    this.idTeam = team.idTeam;
    this.name = team.name;
    this.site = team.site;
};

Team.create = async (team, result) => {
    var deferred = q.defer();
    var query = "INSERT INTO team (" + Object.keys(team).join(",") + ") VALUES (" + Object.values(team).map(function (x) { return typeof (x) === 'string' ? '"' + x + '"' : x; }).join(",") + ")";
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("teamModels created Team: ", { idTeam: res.insertId, ...team });
        deferred.resolve({ idTeam: res.insertId, ...team });
    });
    return deferred.promise;
};

Team.update = async (team, result) => {
    var deferred = q.defer();

    const columns = Object.keys(team);
    const values = Object.values(team);

    let query = "UPDATE team SET " + columns.join(" = ? ,") + " = ? WHERE idTeam = " + team.idTeam;

    const conn = await database.getConnection("accenture");
    conn.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("teamModels update Team: ", { ...team });
            deferred.resolve({ ...team });
        }

        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

Team.delete = async (idTeam, result) => {
    var deferred = q.defer();

    let query = "DELETE FROM team WHERE idTeam = " + idTeam;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }
        if (res.affectedRows > 0) {
            console.log("teamModels delete Team: ", { idTeam: idTeam });
            deferred.resolve({ idTeam: idTeam });
        }

        deferred.resolve({ kind: "not_found" });

    });
    return deferred.promise;
};

Team.findById = async (idTeam, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where team.idTeam = ${idTeam}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found team: ", res[0]);
            deferred.resolve(res);
            return;
        }

        // not found team with the id
        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

Team.findByName = async (name, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        where team.name like '%${name}%'`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found team: ", res);
            deferred.resolve(res);
            return;
        }

        // not found team with the id
        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

Team.findAll = async result => {
    var deferred = q.defer();

    const query = `${basicQuery}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
        }

        console.log("team: ", res);
        deferred.resolve(res);
    });
    return deferred.promise;
};

Team.findByUser = async (idUser, result) => {
    var deferred = q.defer();
    const query = `${basicQuery}
        INNER JOIN user_has_team as user_has_team ON team.idTeam = user_has_team.idTeam
        AND user_has_team.idUser = ${idUser}`;

    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.length) {
            console.log("found team: ", res[0]);
            deferred.resolve(res);
            return;
        }

        // not found team with the id
        deferred.resolve({ kind: "not_found" });
    });
    return deferred.promise;
};

Team.insertUserInTeam = async (idUser, idTeam, result) => {
    var deferred = q.defer();
    var query = `INSERT INTO user_has_team (idUser, idTeam) VALUES (${idUser}, ${idTeam})`;
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        console.log("teamModels insertUserInTeam Team: ", { idUser: idUser, idTeam: idTeam });
        deferred.resolve({ idUser: idUser, idTeam: idTeam });
    });
    return deferred.promise;
};

Team.deleteUserInTeam = async (idUser, idTeam, result) => {
    var deferred = q.defer();
    var query = `DELETE FROM user_has_team WHERE idUser=${idUser} AND idTeam=${idTeam}`;
    const conn = await database.getConnection("accenture");
    conn.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            deferred.reject(err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log("teamModels deleteUserInTeam Team: ", { idUser: idUser, idTeam: idTeam });
            deferred.resolve({ idUser: idUser, idTeam: idTeam });
        }

        deferred.resolve({ kind: "not_found" });

    });
    return deferred.promise;
};

module.exports = Team;