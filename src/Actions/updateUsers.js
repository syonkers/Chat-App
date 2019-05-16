import { UPDATE_USERS } from './actionTypes'

const updateUsers = users=> {
    return {
        type: UPDATE_USERS,
        users
    }
}

export default updateUsers