import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_START_DECISION_LOADING = 'DELEGATIONPOKER_START_DECISION_LOADING';
export const DELEGATIONPOKER_START_DECISION_SUCESS = 'DELEGATIONPOKER_START_DECISION_SUCESS';
export const DELEGATIONPOKER_START_DECISION_ERROR = 'DELEGATIONPOKER_START_DECISION_ERROR';

/*
 * action creators
 */
const startDecisionDelegationPokerByRoom = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_START_DECISION_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/startDecision`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_START_DECISION_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_START_DECISION_ERROR,
                ...error
            }));
}

export { startDecisionDelegationPokerByRoom };
export default startDecisionDelegationPokerByRoom;
