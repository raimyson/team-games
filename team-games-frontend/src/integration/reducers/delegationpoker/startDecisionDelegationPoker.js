import {
	DELEGATIONPOKER_START_DECISION_LOADING,
	DELEGATIONPOKER_START_DECISION_SUCESS,
	DELEGATIONPOKER_START_DECISION_ERROR
} from '../../actions/delegationpoker/startDecisionDelegationPoker';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function startDecisionDelegationPokerByRoom(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_START_DECISION_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_START_DECISION_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_START_DECISION_ERROR:
            return {
				...state,
                ...initialState,
                loading: false,
                error: true
            };
		default:
			return state;
	}
}


export default startDecisionDelegationPokerByRoom;