const roomModels = require('./models/roomModels');

class RoomRepository {
    constructor() {
        this.model = roomModels;
    }

    async findById(id) {
        let rs = {};
        try {
            rs = await this.model.findById(id);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute findById`};
        }
        return rs;
    }

    async create(room) {
        let rs = {};
        try {
            room.roomkey = this.makeid(7)
            if(room.visibility == 'all'){
                room.visibility = 1
            } else {
                room.visibility = 0
            }
            rs = await this.model.create(room);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute create`};
        }
        return rs;
    }

    async update(room) {
        let rs = {};
        try {
            rs = await this.model.update(room);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute update`};
        }
        return rs;
    }

    async delete(id) {
        let rs = {};
        try {
            rs = await this.model.delete(id);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute delete`};
        }
        return rs;
    }

    async findByKeyRoom(id) {
        let rs = {};
        try {
            rs = await this.model.findByKeyRoom(id);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute findByKeyRoom`};
        }
        return rs;
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

}

module.exports = RoomRepository;