import { UPDATE_CURRENT_ROOM_NAME } from './actionTypes'

const updateRoomName = roomName => {
    return {
        type: UPDATE_CURRENT_ROOM_NAME,
        roomName
    }
}

export default updateRoomName