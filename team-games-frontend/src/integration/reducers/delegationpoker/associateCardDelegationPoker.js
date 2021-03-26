import {
	DELEGATIONPOKER_ASSOCIATE_CARD_LOADING,
	DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS,
	DELEGATIONPOKER_ASSOCIATE_CARD_ERROR
} from '../../actions/delegationpoker/associateCardDelegationPoker';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function associateCardDelegationPokerByRoom(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_ASSOCIATE_CARD_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_ASSOCIATE_CARD_ERROR:
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


export default associateCardDelegationPokerByRoom;