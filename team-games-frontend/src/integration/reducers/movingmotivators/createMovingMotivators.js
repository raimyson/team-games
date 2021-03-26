import {
	MOVINGMOTIVATORS_CREATE_LOADING,
	MOVINGMOTIVATORS_CREATE_SUCESS,
	MOVINGMOTIVATORS_CREATE_ERROR
} from '../../actions/movingmotivators/createMovingMotivators';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function createRoomMovingMotivators(state = initialState, action) {
	switch (action.type) {
		case MOVINGMOTIVATORS_CREATE_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case MOVINGMOTIVATORS_CREATE_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case MOVINGMOTIVATORS_CREATE_ERROR:
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


export default createRoomMovingMotivators;