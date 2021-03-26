import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_REMOVE_DECISION_LOADING = 'DELEGATIONPOKER_REMOVE_DECISION_LOADING';
export const DELEGATIONPOKER_REMOVE_DECISION_SUCESS = 'DELEGATIONPOKER_REMOVE_DECISION_SUCESS';
export const DELEGATIONPOKER_REMOVE_DECISION_ERROR = 'DELEGATIONPOKER_REMOVE_DECISION_ERROR';

/*
 * action creators
 */
const removeDecisionDelegationPokerByRoom = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_REMOVE_DECISION_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/removeDecision`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_REMOVE_DECISION_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_REMOVE_DECISION_ERROR,
                ...error
            }));
}

export { removeDecisionDelegationPokerByRoom };
export default removeDecisionDelegationPokerByRoom;
