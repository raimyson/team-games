import axios from '../axios';
/*
 * action types
 */
export const DELEGATIONPOKER_ASSOCIATE_CARD_LOADING = 'DELEGATIONPOKER_ASSOCIATE_CARD_LOADING';
export const DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS = 'DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS';
export const DELEGATIONPOKER_ASSOCIATE_CARD_ERROR = 'DELEGATIONPOKER_ASSOCIATE_CARD_ERROR';

/*
 * action creators
 */
const associateCardDelegationPokerByRoom = (param) => dispatch => {
    dispatch({ type: DELEGATIONPOKER_ASSOCIATE_CARD_LOADING })

        return axios
            .post(`${process.env.PUBLIC_URL}/api/delegationpoker/associateCard`, param)
            .then(response => dispatch({
                type: DELEGATIONPOKER_ASSOCIATE_CARD_SUCESS,
                ...response
            }))
            .catch(error => dispatch({
                type: DELEGATIONPOKER_ASSOCIATE_CARD_ERROR,
                ...error
            }));
}

export { associateCardDelegationPokerByRoom };
export default associateCardDelegationPokerByRoom;
