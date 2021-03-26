import {
	MOVINGMOTIVATORS_ENTER_LOADING,
	MOVINGMOTIVATORS_ENTER_SUCESS,
	MOVINGMOTIVATORS_ENTER_ERROR
} from '../../actions/movingmotivators/enterMovingMotivators';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function enterRoomMovingMotivators(state = initialState, action) {
	switch (action.type) {
		case MOVINGMOTIVATORS_ENTER_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case MOVINGMOTIVATORS_ENTER_SUCESS:
			return {
				loading: false,
				error: false,
			};
        case MOVINGMOTIVATORS_ENTER_ERROR:
            return {
				data: action.data,
                loading: false,
                error: true
            };
		default:
			return state;
	}
}


export default enterRoomMovingMotivators;