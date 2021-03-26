import {
	DELEGATIONPOKER_BY_ROOM_LOADING,
	DELEGATIONPOKER_BY_ROOM_SUCESS,
	DELEGATIONPOKER_BY_ROOM_ERROR
} from '../../actions/delegationpoker/delegationPokerByRoom';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function findDelegationPokerByRoom(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_BY_ROOM_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_BY_ROOM_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_BY_ROOM_ERROR:
            return {
				...state,
                loading: false,
                error: true
            };
		default:
			return state;
	}
}


export default findDelegationPokerByRoom;