import {
	DELEGATIONPOKER_REMOVE_DECISION_LOADING,
	DELEGATIONPOKER_REMOVE_DECISION_SUCESS,
	DELEGATIONPOKER_REMOVE_DECISION_ERROR
} from '../../actions/delegationpoker/removeDecisionDelegationPoker';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function removeDecisionDelegationPokerByRoom(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_REMOVE_DECISION_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_REMOVE_DECISION_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_REMOVE_DECISION_ERROR:
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


export default removeDecisionDelegationPokerByRoom;