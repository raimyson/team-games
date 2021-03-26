import {
	DELEGATIONPOKER_CREATE_LOADING,
	DELEGATIONPOKER_CREATE_SUCESS,
	DELEGATIONPOKER_CREATE_ERROR
} from '../../actions/delegationpoker/createDelegationPoker';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function createRoomDelegationPoker(state = initialState, action) {
	switch (action.type) {
		case DELEGATIONPOKER_CREATE_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case DELEGATIONPOKER_CREATE_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case DELEGATIONPOKER_CREATE_ERROR:
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


export default createRoomDelegationPoker;