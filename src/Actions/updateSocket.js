import { UPDATE_SOCKET } from './actionTypes'

const updateSocket = socket => {
    return {
        type: UPDATE_SOCKET,
        socket
    }
}

export default updateSocket