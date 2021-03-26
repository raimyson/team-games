const playerModels = require('./models/playerModels');

class PlayerRepository {
    constructor() {
        this.model = playerModels;
    }

    async create(player) {
        let rs = {};
        try {
            rs = await this.model.create(player);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute create`};
        }
        return rs;
    }

    async findByRoom(roomid) {
        let rs = {};
        try {
            rs = await this.model.findByRoom(roomid);
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = {error: `Error execute findByRoom`};
        }
        return rs;
    }

}

module.exports = PlayerRepository;