import { UPDATE_MESSAGES } from './actionTypes'

const updateMessages = messages => {
    return {
        type: UPDATE_MESSAGES,
        messages
    }
}

export default updateMessages