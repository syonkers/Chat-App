import { RECEIVE_MESSAGE } from './actionTypes'

const receiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export default receiveMessage