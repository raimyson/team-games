import axios from '../axios';
/*
 * action types
 */
export const MOVINGMOTIVATORS_REMOVE_LOADING = 'MOVINGMOTIVATORS_REMOVE_LOADING';
export const MOVINGMOTIVATORS_REMOVE_SUCESS = 'MOVINGMOTIVATORS_REMOVE_SUCESS';
export const MOVINGMOTIVATORS_REMOVE_ERROR = 'MOVINGMOTIVATORS_REMOVE_ERROR';

/*
 * action creators
 */
const removePlayerMovingMotivators = (param) => dispatch => {
    dispatch({ type: MOVINGMOTIVATORS_REMOVE_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/movingmotivators/deleteUserInRoom`, param)
            .then(response => dispatch({
                type: MOVINGMOTIVATORS_REMOVE_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: MOVINGMOTIVATORS_REMOVE_ERROR,
                ...error
            }));
}

export { removePlayerMovingMotivators };
export default removePlayerMovingMotivators;
