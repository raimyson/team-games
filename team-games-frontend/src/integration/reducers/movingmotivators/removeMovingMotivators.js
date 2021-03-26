import {
	MOVINGMOTIVATORS_REMOVE_LOADING,
	MOVINGMOTIVATORS_REMOVE_SUCESS,
	MOVINGMOTIVATORS_REMOVE_ERROR
} from '../../actions/movingmotivators/removerMovingMotivators';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function removePlayerMovingMotivators(state = initialState, action) {
	switch (action.type) {
		case MOVINGMOTIVATORS_REMOVE_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case MOVINGMOTIVATORS_REMOVE_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case MOVINGMOTIVATORS_REMOVE_ERROR:
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


export default removePlayerMovingMotivators;