import axios from '../axios';
/*
 * action types
 */
export const MOVINGMOTIVATORS_ENTER_LOADING = 'MOVINGMOTIVATORS_ENTER_LOADING';
export const MOVINGMOTIVATORS_ENTER_SUCESS = 'MOVINGMOTIVATORS_ENTER_SUCESS';
export const MOVINGMOTIVATORS_ENTER_ERROR = 'MOVINGMOTIVATORS_ENTER_ERROR';

/*
 * action creators
 */
const enterRoomMovingMotivators = (param) => dispatch => {
    dispatch({ type: MOVINGMOTIVATORS_ENTER_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/movingmotivators/enter`, param)
            .then(response => dispatch({
                type: MOVINGMOTIVATORS_ENTER_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: MOVINGMOTIVATORS_ENTER_ERROR,
                ...error
            }));
}

export { enterRoomMovingMotivators };
export default enterRoomMovingMotivators;
