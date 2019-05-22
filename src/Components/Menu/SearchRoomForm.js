import React from 'react';
import { connect } from'react-redux';
import toggleSearchRoomForm from '../../Actions/toggleSearchRoomForm';


const handleClick = (e, socket, dispatch, result) => {
    e.preventDefault();
    socket.emit('joinChatroom', result);
    dispatch(toggleSearchRoomForm());
}

const SearchRoomForm = ({searchResults, socket, dispatch}) => (
    <div className="pop-up-form">
        <form className="pop-up-form-container">
            <h1>Room Search</h1>              
            <div className="search-results">
                <ul>
                {
                    searchResults.map(result => {
                        return(
                            <li key={result}>
                                <button type="button" className="btn-like-link" onClick={(e) => handleClick(e, socket, dispatch, result)}>{result}</button>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
            <button type="button" className="btn cancel" onClick={() => dispatch(toggleSearchRoomForm())}>Cancel</button>
        </form>
    </div>
);

const mapStateToProps = store => ({
    socket: store.socket,
    searchResults: store.searchResults
});

export default connect(mapStateToProps)(SearchRoomForm)