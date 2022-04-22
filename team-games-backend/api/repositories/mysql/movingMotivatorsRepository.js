const movingMotivatorsModels = require('./models/movingMotivatorsModels');
const RoomRepository = require('./roomRepository');

class MovingMotivatorsRepository {
    constructor() {
        this.model = movingMotivatorsModels;

    }

    async findById(id) {
        let rs = {};
        try {
            rs = await this.model.findById(id);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute findById` };
        }
        return rs;
    }

    async create(moving) {
        let rs = {};
        try {
            let room = { "visibility": moving.visibility }
            let roomRepository = new RoomRepository();
            room = await roomRepository.create(room)

            let mm = {
                "name": moving.name,
                "email": moving.email,
                "roomid": room.id
            }

            rs = await this.model.create(mm);
            rs.id = room.roomkey
            delete rs.roomid;
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute create` };
        }
        return rs;
    }

    async update(team) {
        let rs = {};
        try {
            rs = await this.model.update(team);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute update` };
        }
        return rs;
    }

    async delete(id) {
        let rs = {};
        try {
            rs = await this.model.delete(id);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute delete` };
        }
        return rs;
    }

    async insertUserInRoom(user, code) {
        let rs = {};
        try {
            rs = await this.model.insertUserInRoom(user, code);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute insertUserInRoom` };
        }
        return rs;
    }

    async deleteUserInRoom(user, roomid) {
        let rs = {};
        try {
            rs = await this.model.deleteUserInRoom(user, roomid);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute deleteUserInRoom` };
        }
        return rs;
    }

    async findByRoom(code, name) {
        let rs = {};
        try {
            let roomRepository = new RoomRepository();
            rs.room = await roomRepository.findByKeyRoom(code);

            if (!rs.room) {
                return undefined;
            }

            if (name) {
                rs.people = await this.model.findByRoom(rs.room.id);
                if (rs.people) {
                    let person = rs.people.find(obj => obj.name == name)
                    //valid admin
                    if (rs.room.visibility == 1 || person.email) {
                        rs.admin = true;
                    } else {
                        rs.people = [person];
                    }
                }
            }


        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute findByRoom` };
        }
        return rs;
    }

    async enter(param) {
        let rs = {};
        try {
            let roomRepository = new RoomRepository();
            rs.room = await roomRepository.findByKeyRoom(param.code);
            if (!rs.room) {
                return undefined;
            }
            rs.people = await this.model.findByRoom(rs.room.id);
            if (rs.people) {
                let person = rs.people.find(obj => obj.name == param.name)
                //valid admin
                if (param.code.length == 7 && person) {
                    rs.admin = true;
                } else if (person && person.name == param.name) {
                    return undefined;
                } else {
                    let mm = {
                        "name": param.name,
                        "roomid": rs.room.id
                    }

                    let newperson = await this.model.create(mm);
                    newperson = await this.model.findById(newperson.id);
                    if (rs.room.visibility == 1) {
                        rs.people.push(newperson)
                    } else {
                        rs.people = [newperson];
                    }
                }
            }
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute enter` };
        }
        return rs;
    }

}

module.exports = MovingMotivatorsRepository;