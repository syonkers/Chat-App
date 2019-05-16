import { UPDATE_JOINED_ROOMS } from './actionTypes'

const updateJoinedRooms = rooms => {
    return {
        type: UPDATE_JOINED_ROOMS,
        rooms
    }
}

export default updateJoinedRooms