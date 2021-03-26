import axios from '../axios';
/*
 * action types
 */
export const MOVINGMOTIVATORS_BY_ROOM_LOADING = 'MOVINGMOTIVATORS_BY_ROOM_LOADING';
export const MOVINGMOTIVATORS_BY_ROOM_SUCESS = 'MOVINGMOTIVATORS_BY_ROOM_SUCESS';
export const MOVINGMOTIVATORS_BY_ROOM_ERROR = 'MOVINGMOTIVATORS_BY_ROOM_ERROR';

/*
 * action creators
 */
const findMovingMotivatorsByRoom = (param) => dispatch => {
    dispatch({ type: MOVINGMOTIVATORS_BY_ROOM_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/movingmotivators/findByRoom`, param)
            .then(response => dispatch({
                type: MOVINGMOTIVATORS_BY_ROOM_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: MOVINGMOTIVATORS_BY_ROOM_ERROR,
                ...error
            }));
}

export { findMovingMotivatorsByRoom };
export default findMovingMotivatorsByRoom;
