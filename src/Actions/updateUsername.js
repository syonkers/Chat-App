import { UPDATE_USERNAME } from './actionTypes'

const updateUsername = username => {
    return {
        type: UPDATE_USERNAME,
        username
    }
}

export default updateUsername