import {
	MOVINGMOTIVATORS_BY_ROOM_LOADING,
	MOVINGMOTIVATORS_BY_ROOM_SUCESS,
	MOVINGMOTIVATORS_BY_ROOM_ERROR
} from '../../actions/movingmotivators/movingMotivatorsByRoom';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function findMovingMotivatorsByRoom(state = initialState, action) {
	switch (action.type) {
		case MOVINGMOTIVATORS_BY_ROOM_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case MOVINGMOTIVATORS_BY_ROOM_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case MOVINGMOTIVATORS_BY_ROOM_ERROR:
            return {
				...state,
                loading: false,
                error: true
            };
		default:
			return state;
	}
}


export default findMovingMotivatorsByRoom;