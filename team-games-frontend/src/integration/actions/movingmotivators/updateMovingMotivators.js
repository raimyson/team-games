import axios from '../axios';
/*
 * action types
 */
export const MOVINGMOTIVATORS_UPDATE_LOADING = 'MOVINGMOTIVATORS_UPDATE_LOADING';
export const MOVINGMOTIVATORS_UPDATE_SUCESS = 'MOVINGMOTIVATORS_UPDATE_SUCESS';
export const MOVINGMOTIVATORS_UPDATE_ERROR = 'MOVINGMOTIVATORS_UPDATE_ERROR';

/*
 * action creators
 */
const updatePlayerMovingMotivators = (param) => dispatch => {
    dispatch({ type: MOVINGMOTIVATORS_UPDATE_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/movingmotivators/update`, param)
            .then(response => dispatch({
                type: MOVINGMOTIVATORS_UPDATE_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: MOVINGMOTIVATORS_UPDATE_ERROR,
                ...error
            }));
}

export { updatePlayerMovingMotivators };
export default updatePlayerMovingMotivators;
