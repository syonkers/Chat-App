import React from 'react';
import { connect } from 'react-redux';
import { FaPlus, FaMinus, FaUserPlus, FaSearch } from 'react-icons/fa';
import toggleCreateRoomForm from '../../Actions/toggleCreateRoomForm';
import toggleSearchRoomForm from '../../Actions/toggleSearchRoomForm';
import toggleSearchUserForm from '../../Actions/toggleSearchUserForm';



const IconBar = ({ dispatch, currentRoomName, socket }) => (
    <div className="icon-bar">
        <button title="Search Chatroom" className="icon-bar-button" onClick={() => dispatch(toggleSearchRoomForm())}>
            <FaSearch />
        </button> 
        <button title="Create Chatroom" className="icon-bar-button" onClick={() => dispatch(toggleCreateRoomForm())}>
            <FaPlus />
        </button> 
        <button title="Leave Chatroom" className="icon-bar-button" onClick={() => socket.emit('leaveChatroom', currentRoomName)}>
            <FaMinus />
        </button>
        <button title="Search for user" className="icon-bar-button" onClick={() => dispatch(toggleSearchUserForm())}>
            <FaUserPlus />
        </button>
    </div> 
);

const mapStateToProps = store => ({
    currentRoomName: store.currentRoomName,
    socket: store.socket
});

export default connect(mapStateToProps)(IconBar)