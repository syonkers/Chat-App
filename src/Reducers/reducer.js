// Imports
import initialState from '../initialState';
import * as types from '../Actions/actionTypes'

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_LOGIN:
            return Object.assign({}, state, {
                isAuthenticated: action.login.isAuthenticated,
                username: action.login.username,
                messages: action.login.messages,
                currentRoomName: action.login.currentRoomName,
                joinedRooms: action.login.joinedRooms,
            });

        case types.UPDATE_SOCKET:
            return Object.assign({}, state, {
                socket: action.socket
            });

        case types.UPDATE_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            });

        case types.UPDATE_ERROR_MESSAGE:
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });

        case types.RECEIVE_MESSAGE:
            return Object.assign({}, state, {
                messages: state.messages.concat(action.message)
            });

        case types.UPDATE_MESSAGES:
            return Object.assign({}, state, {
                messages: action.messages
            });
            
        case types.UPDATE_CURRENT_ROOM_NAME:
            return Object.assign({}, state, {
                currentRoomName: action.roomName
            });   

        case types.UPDATE_JOINED_ROOMS:
            return Object.assign({}, state, {
                joinedRooms: action.rooms
            });

        case types.UPDATE_SEARCH_RESULTS:
            return Object.assign({}, state, {
                searchResults: action.results,
                showSearchRoomForm: true
            });

        case types.UPDATE_SEARCH_TEXT:
            return Object.assign({}, state, {
                searchText: action.text
            });
            
        case types.UPDATE_USERS:
            return Object.assign({}, state, {
                users: action.users
            });

        case types.TOGGLE_SEARCH_ROOM_FORM:
            return Object.assign({}, state, {
                showSearchRoomForm: !state.showSearchRoomForm,
                searchResults: [],
                searchText: ''
            });

        default:
            return state
    }
}

export default reducer