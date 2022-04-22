import {
	MOVINGMOTIVATORS_SOCKET_LOADING,
	MOVINGMOTIVATORS_SOCKET_SUCESS,
	MOVINGMOTIVATORS_SOCKET_ERROR
} from '../../actions/movingmotivators/movingMotivatorsSocket';

const initialState = {
	data: undefined,
	loading: false,
	error: false,
};

function movingMotivatorsBySocket (state = initialState, action) {
	switch (action.type) {
		case MOVINGMOTIVATORS_SOCKET_LOADING:
			return {
				...state,
				loading: true,
				error: false,
			};
		case MOVINGMOTIVATORS_SOCKET_SUCESS:
			return {
				data: action.data,
				loading: false,
				error: false,
			};
        case MOVINGMOTIVATORS_SOCKET_ERROR:
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


export default movingMotivatorsBySocket;