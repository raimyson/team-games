import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_ENTER_LOADING = 'DELEGATIONPOKER_ENTER_LOADING';
export const DELEGATIONPOKER_ENTER_SUCESS = 'DELEGATIONPOKER_ENTER_SUCESS';
export const DELEGATIONPOKER_ENTER_ERROR = 'DELEGATIONPOKER_ENTER_ERROR';

/*
 * action creators
 */
const enterRoomDelegationPoker = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_ENTER_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/enter`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_ENTER_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_ENTER_ERROR,
                ...error
            }));
}

export { enterRoomDelegationPoker };
export default enterRoomDelegationPoker;
