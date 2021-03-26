import axios from '../axios';
/*
 * action types
 */
export const MOVINGMOTIVATORS_CREATE_LOADING = 'MOVINGMOTIVATORS_CREATE_LOADING';
export const MOVINGMOTIVATORS_CREATE_SUCESS = 'MOVINGMOTIVATORS_CREATE_SUCESS';
export const MOVINGMOTIVATORS_CREATE_ERROR = 'MOVINGMOTIVATORS_CREATE_ERROR';

/*
 * action creators
 */
const createRoomMovingMotivators = (param) => dispatch => {
    dispatch({ type: MOVINGMOTIVATORS_CREATE_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/movingmotivators/create`, param)
            .then(response => dispatch({
                type: MOVINGMOTIVATORS_CREATE_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: MOVINGMOTIVATORS_CREATE_ERROR,
                ...error
            }));
}

export { createRoomMovingMotivators };
export default createRoomMovingMotivators;
