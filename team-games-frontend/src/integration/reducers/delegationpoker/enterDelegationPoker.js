import {
	DELEGATIONPOKER_ENTER_LOADING,
	DELEGATIONPOKER_ENTER_SUCESS,
	DELEGATIONPOKER_ENTER_ERROR
} from '../../actions/delegationpoker/enterDelegationPoker';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function enterRoomDelegationPoker(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_ENTER_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_ENTER_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_ENTER_ERROR:
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


export default enterRoomDelegationPoker;