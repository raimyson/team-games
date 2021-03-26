const delegationPokerModels = require('./models/delegationPokerModels');
const RoomRepository = require('./roomRepository');
const PlayerRepository = require('./playerRepository');
const groupBy = require('group-by')

class DelegationPokerRepository {
    constructor() {
        this.model = delegationPokerModels;
    }

    async create(delegation) {
        let rs = {};
        try {
            let room = { "visibility": delegation.visibility }
            let roomRepository = new RoomRepository();
            room = await roomRepository.create(room)

            rs.room = room;

            let player = {
                "name": delegation.name,
                "email": delegation.email,
                "admin": 1,
                "roomid": room.id
            }

            let playerRepository = new PlayerRepository();

            player = await playerRepository.create(player);
            rs.id = room.roomkey
            delete rs.roomid;
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute create` };
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
                let playerRepository = new PlayerRepository();
                rs.people = await playerRepository.findByRoom(rs.room.id);
                if (rs.people) {
                    let person = rs.people.find(obj => obj.name == name)
                    //valid admin
                    if (person.admin == 1) {
                        rs.admin = true;
                    }
                }
            }

            rs.decision = await this.model.findByRoom(rs.room.id);
            if (rs.decision){
                for (let i = 0; i < rs.decision.length; i++) {
                    let dec = rs.decision[i];
                    dec.cards = await this.model.findPlayerByRoom(dec.id);
                    dec.cards = groupBy(dec.cards, 'card')
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
            
            let playerRepository = new PlayerRepository();
            rs.people = await playerRepository.findByRoom(rs.room.id);
            if (rs.people) {
                let person = rs.people.find(obj => obj.name == param.name)
                //valid admin
                if (param.code.length == 7 && person.admin == 1) {
                    rs.admin = true;
                } else if (person && person.name == param.name) {
                    return undefined;
                } else {
                    let player = {
                        "name": param.name,
                        "roomid": rs.room.id
                    }

                    player = await playerRepository.create(player);
                    if (player){
                        rs.people.push(player)
                    }                    
                }
            }
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute enter` };
        }
        return rs;
    }

    async createDecision(delegation) {
        let rs = {};
        try {
            let roomRepository = new RoomRepository();
            rs.room = await roomRepository.findByKeyRoom(delegation.code);
            if (!rs.room) {
                return undefined;
            }

            let decision = {
                "decision": delegation.decision,
                "visibility": 0,
                "roomid": rs.room.id
            }

            decision = await this.model.create(decision);
            rs.decision = decision;
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute create` };
        }
        return rs;
    }

    async removeDecision(delegation) {
        let rs = {};
        try {
            let roomRepository = new RoomRepository();
            rs.room = await roomRepository.findByKeyRoom(delegation.code);
            if (!rs.room) {
                return undefined;
            }

            await this.model.removePlayerByRoom(delegation.decision);
            decision = await this.model.delete(delegation.decision);
            rs.decision = decision;
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute create` };
        }
        return rs;
    }

    async startDecision(delegation) {
        let rs = {};
        try {
            let roomRepository = new RoomRepository();
            rs.room = await roomRepository.findByKeyRoom(delegation.code);
            if (!rs.room) {
                return undefined;
            }

            let decision = {
                "id": delegation.decision,
                "visibility": 1
            }

            decision = await this.model.update(decision);
            rs.decision = decision;
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute create` };
        }
        return rs;
    }

    async associateCard(delegation) {
        let rs = {};
        try {
            let roomRepository = new RoomRepository();
            rs.room = await roomRepository.findByKeyRoom(delegation.code);
            if (!rs.room) {
                return undefined;
            }

            let playerRepository = new PlayerRepository();
            rs.people = await playerRepository.findByRoom(rs.room.id);
            let player = rs.people.find(o => o.name == delegation.name)
            if (!player) {
                return undefined;
            }

            let cards = await this.model.findPlayerByRoom(delegation.decision)
            let decision = {
                "delegationpokerid": delegation.decision,
                "playerid": player.id,
                "card": delegation.card
            }

            if(cards.find(o => o.playerid == player.id)){
                rs.decision = await this.model.updateCard(decision);
            } else {
                rs.decision = await this.model.createCard(decision);
            }

            
        } catch (error) {
            console.log(`${module} - ${error}`);
            rs = { error: `Error execute create` };
        }
        return rs;
    }
}

module.exports = DelegationPokerRepository;