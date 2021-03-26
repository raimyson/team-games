import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_CREATE_LOADING = 'DELEGATIONPOKER_CREATE_LOADING';
export const DELEGATIONPOKER_CREATE_SUCESS = 'DELEGATIONPOKER_CREATE_SUCESS';
export const DELEGATIONPOKER_CREATE_ERROR = 'DELEGATIONPOKER_CREATE_ERROR';

/*
 * action creators
 */
const createRoomDelegationPoker = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_CREATE_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/create`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_CREATE_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_CREATE_ERROR,
                ...error
            }));
}

export { createRoomDelegationPoker };
export default createRoomDelegationPoker;
