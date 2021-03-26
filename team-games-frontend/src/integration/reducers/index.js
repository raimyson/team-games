import { combineReducers } from 'redux';

import createMovingMotivators from './movingmotivators/createMovingMotivators';
import movingMotivatorsByRoom from './movingmotivators/movingMotivatorsByRoom';
import enterMovingMotivators from './movingmotivators/enterMovingMotivators';
import updateMovingMotivators from './movingmotivators/updateMovingMotivators';
import removeMovingMotivators from './movingmotivators/removeMovingMotivators';

import createDelegationPoker from './delegationpoker/createDelegationPoker';
import delegationPokerByRoom from './delegationpoker/delegationPokerByRoom';
import enterDelegationPoker from './delegationpoker/enterDelegationPoker';
import createDecisionDelegationPoker from './delegationpoker/createDecisionDelegationPoker';
import removeDecisionDelegationPoker from './delegationpoker/removeDecisionDelegationPoker';
import startDecisionDelegationPoker from './delegationpoker/startDecisionDelegationPoker';
import associateCardDelegationPoker from './delegationpoker/associateCardDelegationPoker';

export default combineReducers({
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
});