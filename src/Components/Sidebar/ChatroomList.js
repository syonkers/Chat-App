import React from 'react';
import { connect } from 'react-redux';


const handleClick = ( socket, roomname, currentRoomName, e ) => {
    e.preventDefault();
    if (currentRoomName !== roomname) {
        socket.emit('joinChatroom', roomname);
    }
};


const roomsList = (socket, joinedRooms, currentRoomName) => (
    joinedRooms.map(room => {
        const active = room === currentRoomName ? 'active' : '';
        return (
        <li key={room} className={"room " + active}>
            <button className="btn-like-link" onClick={(e) => handleClick(socket, room, currentRoomName, e)}>{room}</button>
        </li>)
}));


const ChatRoomList = ({socket, joinedRooms, currentRoomName }) => (
    <div className="rooms-list">
        <h3>Rooms</h3>
        <ul>
        {roomsList(socket, joinedRooms, currentRoomName)}
        </ul>
    </div>
);

const mapStateToProps = store => ({
    socket: store.socket,
    joinedRooms: store.joinedRooms,
    currentRoomName: store.currentRoomName
});

export default connect(mapStateToProps)(ChatRoomList)