import io from 'socket.io-client'
/*
 * action types
 */
export const MOVINGMOTIVATORS_SOCKET_LOADING = 'MOVINGMOTIVATORS_SOCKET_LOADING';
export const MOVINGMOTIVATORS_SOCKET_SUCESS = 'MOVINGMOTIVATORS_SOCKET_SUCESS';
export const MOVINGMOTIVATORS_SOCKET_ERROR = 'MOVINGMOTIVATORS_SOCKET_ERROR';

/*
 * action creators
 */

const movingMotivatorsBySocket = (action, param) => dispatch => {
    dispatch({ type: MOVINGMOTIVATORS_SOCKET_LOADING })

    //const socket = io(`${process.env.PUBLIC_URL}`,  { path: `/api/io/movingmotivators/socket` });
    const socket = io(`http://localhost:8080/`,  { path: `/api/io/movingmotivators/socket`, transports: ["websocket", "polling"], upgrade: false });
    // //const socket = io(`${process.env.PUBLIC_URL}/api`);
    socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'))

    if (action == "send") {
        socket.emit('chat.message', param);
        return;
    }
    socket.on('chat.message',  () => console.log('[IO] Connect => A new mensagem'));
}

export { movingMotivatorsBySocket };
export default movingMotivatorsBySocket;
