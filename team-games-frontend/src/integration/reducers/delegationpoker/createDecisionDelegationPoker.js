import {
	DELEGATIONPOKER_CREATE_DECISION_LOADING,
	DELEGATIONPOKER_CREATE_DECISION_SUCESS,
	DELEGATIONPOKER_CREATE_DECISION_ERROR
} from '../../actions/delegationpoker/createDecisionDelegationPoker';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function createDecisionDelegationPokerByRoom(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_CREATE_DECISION_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_CREATE_DECISION_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_CREATE_DECISION_ERROR:
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


export default createDecisionDelegationPokerByRoom;