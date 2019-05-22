import React from 'react';
import { connect } from 'react-redux';
import { GiCancel } from 'react-icons/gi';

const handleClick = ( socket, roomname, currentRoomName, e ) => {
    e.preventDefault();
    if (currentRoomName !== roomname) {
        socket.emit('joinChatroom', roomname);
    }
};

const handleCancel = (socket, room, e) => {
    e.preventDefault();
    socket.emit('leaveChatroom', room);
}


const roomsList = (socket, joinedRooms, currentRoomName) => (
    joinedRooms.map(room => {
        const active = room === currentRoomName ? 'active' : '';
        return (
        <li key={room} className={"room " + active}>
            <button className="btn-like-link" onClick={(e) => handleClick(socket, room, currentRoomName, e)}>{room}</button>
            <span>
                <button className="cancel-btn" onClick={(e) => handleCancel(socket, room, e)}>
                    <GiCancel />
                </button>
            </span>
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