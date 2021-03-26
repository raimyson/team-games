import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_BY_ROOM_LOADING = 'DELEGATIONPOKER_BY_ROOM_LOADING';
export const DELEGATIONPOKER_BY_ROOM_SUCESS = 'DELEGATIONPOKER_BY_ROOM_SUCESS';
export const DELEGATIONPOKER_BY_ROOM_ERROR = 'DELEGATIONPOKER_BY_ROOM_ERROR';

/*
 * action creators
 */
const findDelegationPokerByRoom = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_BY_ROOM_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/findByRoom`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_BY_ROOM_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_BY_ROOM_ERROR,
                ...error
            }));
}

export { findDelegationPokerByRoom };
export default findDelegationPokerByRoom;
