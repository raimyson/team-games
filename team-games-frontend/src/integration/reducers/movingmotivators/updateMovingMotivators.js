import {
	MOVINGMOTIVATORS_UPDATE_LOADING,
	MOVINGMOTIVATORS_UPDATE_SUCESS,
	MOVINGMOTIVATORS_UPDATE_ERROR
} from '../../actions/movingmotivators/updateMovingMotivators';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function updatePlayerMovingMotivators(state = initialState, action) {
	switch (action.type) {
		case MOVINGMOTIVATORS_UPDATE_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case MOVINGMOTIVATORS_UPDATE_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case MOVINGMOTIVATORS_UPDATE_ERROR:
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


export default updatePlayerMovingMotivators;