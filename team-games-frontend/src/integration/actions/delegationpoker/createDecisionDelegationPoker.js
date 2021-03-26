import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_CREATE_DECISION_LOADING = 'DELEGATIONPOKER_CREATE_DECISION_LOADING';
export const DELEGATIONPOKER_CREATE_DECISION_SUCESS = 'DELEGATIONPOKER_CREATE_DECISION_SUCESS';
export const DELEGATIONPOKER_CREATE_DECISION_ERROR = 'DELEGATIONPOKER_CREATE_DECISION_ERROR';

/*
 * action creators
 */
const createDecisionDelegationPokerByRoom = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_CREATE_DECISION_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/createDecision`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_CREATE_DECISION_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_CREATE_DECISION_ERROR,
                ...error
            }));
}

export { createDecisionDelegationPokerByRoom };
export default createDecisionDelegationPokerByRoom;
