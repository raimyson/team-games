import {
    createRoomMovingMotivators,
    MOVINGMOTIVATORS_CREATE_LOADING,
    MOVINGMOTIVATORS_CREATE_SUCESS,
    MOVINGMOTIVATORS_CREATE_ERROR
} from './movingmotivators/createMovingMotivators';

import {
    findMovingMotivatorsByRoom,
    MOVINGMOTIVATORS_BY_ROOM_LOADING,
    MOVINGMOTIVATORS_BY_ROOM_SUCESS,
    MOVINGMOTIVATORS_BY_ROOM_ERROR
} from './movingmotivators/movingMotivatorsByRoom';

import {
    enterRoomMovingMotivators,
    MOVINGMOTIVATORS_ENTER_LOADING,
    MOVINGMOTIVATORS_ENTER_SUCESS,
    MOVINGMOTIVATORS_ENTER_ERROR
} from './movingmotivators/enterMovingMotivators';

import {
    updatePlayerMovingMotivators,
    MOVINGMOTIVATORS_UPDATE_LOADING,
    MOVINGMOTIVATORS_UPDATE_SUCESS,
    MOVINGMOTIVATORS_UPDATE_ERROR
} from './movingmotivators/updateMovingMotivators';

import {
    removePlayerMovingMotivators,
    MOVINGMOTIVATORS_REMOVE_LOADING,
    MOVINGMOTIVATORS_REMOVE_SUCESS,
    MOVINGMOTIVATORS_REMOVE_ERROR
} from './movingmotivators/removerMovingMotivators';

import {
    createRoomDelegationPoker,
    DELEGATIONPOKER_CREATE_LOADING,
    DELEGATIONPOKER_CREATE_SUCESS,
    DELEGATIONPOKER_CREATE_ERROR
} from './delegationpoker/createDelegationPoker';

import {
    findDelegationPokerByRoom,
    DELEGATIONPOKER_BY_ROOM_LOADING,
    DELEGATIONPOKER_BY_ROOM_SUCESS,
    DELEGATIONPOKER_BY_ROOM_ERROR
} from './delegationpoker/delegationPokerByRoom';

import {
    enterRoomDelegationPoker,
    DELEGATIONPOKER_ENTER_LOADING,
    DELEGATIONPOKER_ENTER_SUCESS,
    DELEGATIONPOKER_ENTER_ERROR
} from './delegationpoker/enterDelegationPoker';

import {
    createDecisionDelegationPokerByRoom,
    DELEGATIONPOKER_CREATE_DECISION_LOADING,
    DELEGATIONPOKER_CREATE_DECISION_SUCESS,
    DELEGATIONPOKER_CREATE_DECISION_ERROR
} from './delegationpoker/createDecisionDelegationPoker';

import {
    removeDecisionDelegationPokerByRoom,
    DELEGATIONPOKER_REMOVE_DECISION_LOADING,
    DELEGATIONPOKER_REMOVE_DECISION_SUCESS,
    DELEGATIONPOKER_REMOVE_DECISION_ERROR
} from './delegationpoker/removeDecisionDelegationPoker';

import {
    startDecisionDelegationPokerByRoom,
    DELEGATIONPOKER_START_DECISION_LOADING,
    DELEGATIONPOKER_START_DECISION_SUCESS,
    DELEGATIONPOKER_START_DECISION_ERROR
} from './delegationpoker/startDecisionDelegationPoker';

import {
    associateCardDelegationPokerByRoom,
    DELEGATIONPOKER_ASSOCIATE_CARD_LOADING,
    DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS,
    DELEGATIONPOKER_ASSOCIATE_CARD_ERROR
} from './delegationpoker/associateCardDelegationPoker';

const createMovingMotivators = {
    createRoomMovingMotivators,
    MOVINGMOTIVATORS_CREATE_LOADING,
    MOVINGMOTIVATORS_CREATE_SUCESS,
    MOVINGMOTIVATORS_CREATE_ERROR
};

const movingMotivatorsByRoom = {
    findMovingMotivatorsByRoom,
    MOVINGMOTIVATORS_BY_ROOM_LOADING,
    MOVINGMOTIVATORS_BY_ROOM_SUCESS,
    MOVINGMOTIVATORS_BY_ROOM_ERROR
};

const enterMovingMotivators = {
    enterRoomMovingMotivators,
    MOVINGMOTIVATORS_ENTER_LOADING,
    MOVINGMOTIVATORS_ENTER_SUCESS,
    MOVINGMOTIVATORS_ENTER_ERROR
};

const updateMovingMotivators = {
    updatePlayerMovingMotivators,
    MOVINGMOTIVATORS_UPDATE_LOADING,
    MOVINGMOTIVATORS_UPDATE_SUCESS,
    MOVINGMOTIVATORS_UPDATE_ERROR
};

const removeMovingMotivators = {
    removePlayerMovingMotivators,
    MOVINGMOTIVATORS_REMOVE_LOADING,
    MOVINGMOTIVATORS_REMOVE_SUCESS,
    MOVINGMOTIVATORS_REMOVE_ERROR
};

const createDelegationPoker = {
    createRoomDelegationPoker,
    DELEGATIONPOKER_CREATE_LOADING,
    DELEGATIONPOKER_CREATE_SUCESS,
    DELEGATIONPOKER_CREATE_ERROR
};

const delegationPokerByRoom = {
    findDelegationPokerByRoom,
    DELEGATIONPOKER_BY_ROOM_LOADING,
    DELEGATIONPOKER_BY_ROOM_SUCESS,
    DELEGATIONPOKER_BY_ROOM_ERROR
};

const enterDelegationPoker = {
    enterRoomDelegationPoker,
    DELEGATIONPOKER_ENTER_LOADING,
    DELEGATIONPOKER_ENTER_SUCESS,
    DELEGATIONPOKER_ENTER_ERROR
};

const createDecisionDelegationPoker = {
    createDecisionDelegationPokerByRoom,
    DELEGATIONPOKER_CREATE_DECISION_LOADING,
    DELEGATIONPOKER_CREATE_DECISION_SUCESS,
    DELEGATIONPOKER_CREATE_DECISION_ERROR
};

const removeDecisionDelegationPoker = {
    removeDecisionDelegationPokerByRoom,
    DELEGATIONPOKER_REMOVE_DECISION_LOADING,
    DELEGATIONPOKER_REMOVE_DECISION_SUCESS,
    DELEGATIONPOKER_REMOVE_DECISION_ERROR
};

const startDecisionDelegationPoker = {
    startDecisionDelegationPokerByRoom,
    DELEGATIONPOKER_START_DECISION_LOADING,
    DELEGATIONPOKER_START_DECISION_SUCESS,
    DELEGATIONPOKER_START_DECISION_ERROR
};

const associateCardDelegationPoker = {
    associateCardDelegationPokerByRoom,
    DELEGATIONPOKER_ASSOCIATE_CARD_LOADING,
    DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS,
    DELEGATIONPOKER_ASSOCIATE_CARD_ERROR
};

export default {
    createMovingMotivators,
    movingMotivatorsByRoom,
    enterMovingMotivators,
    updateMovingMotivators,
    removeMovingMotivators,
    createDelegationPoker,
    delegationPokerByRoom,
    enterDelegationPoker,
    createDecisionDelegationPoker,
    removeDecisionDelegationPoker,
    startDecisionDelegationPoker,
    associateCardDelegationPoker
};
