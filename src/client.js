// Essentials
import store from './store';
import io from 'socket.io-client';

// Actions
import updateSocket from './Actions/updateSocket';
import updateUsername from './Actions/updateUsername';
import updateCurrentRoomName from './Actions/updateCurrentRoomName';
import updateMessages from './Actions/updateMessages';
import updateUsers from './Actions/updateUsers';
import updateJoinableRooms from './Actions/updateJoinableRooms';
import updateErrorMessage from './Actions/updateErrorMessage';
import setLogin from './Actions/setLogin';
import receiveMessage from './Actions/receiveMessage';
import updateSearchResults from './Actions/updateSearchResults';

const client = () => {
    const socket = io('http://localhost:8080');

    socket.on('connect', () => {
        
        // update the store with the socket once we connect
        store.dispatch(updateSocket(socket));

        // update us on any communication error we may receive
        socket.on('error', err => {
            console.log('received socket error');
            console.log(err);
        });

        // update our custom error message handler
        socket.on('userError', err => {
            console.log(err)
            store.dispatch(updateErrorMessage(err));
        });

        // set initial state from after login
        socket.on('register', response => {
            store.dispatch(setLogin(response));
        });

        // update our message list when we a new message is received
        socket.on('receiveMessage', message => {
            store.dispatch(receiveMessage(message));
        });

        // update entire message list for when socket moves to a different room
        socket.on('updateMessages', messages => {
            store.dispatch(updateMessages(messages));
        });

        // update our user list when someone joins or when we change rooms
        socket.on('updateUsers', users => {
            store.dispatch(updateUsers(users));
        });

        //update the list of rooms we can join
        socket.on('updateRooms', rooms => {
            store.dispatch(updateJoinableRooms(rooms));
        });

        socket.on('searchResults', results => {
            store.dispatch(updateSearchResults(results));
        });

        // update username
        socket.on('updateUsername', username => {
            store.dispatch(updateUsername(username));
        });

        // update the name of the room we are currently in
        socket.on('updateCurrentRoom', room => {
            store.dispatch(updateCurrentRoomName(room));
        });

    });
}

export default client