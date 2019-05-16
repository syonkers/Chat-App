import React from 'react';
import { connect } from'react-redux';
import toggleSearchRoomForm from '../../Actions/toggleSearchRoomForm';

class SearchRoomForm extends React.Component {
    constructor(){
        super()
        this.state = {
            searchString: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handeClick = this.handleClick.bind(this);

    }

    handleNameChange(e, socket) {
        e.preventDefault();
        this.setState({
            searchString: e.target.value
        });
        socket.emit('searchChatrooms', e.target.value);
    }

    handleClick(e, socket, dispatch, result) {
        e.preventDefault();
        socket.emit('joinChatroom', result);
        this.setState({
            searchString: ''
        });
        dispatch(toggleSearchRoomForm());
    }

    render() {
        const { searchResults, socket, dispatch } = this.props;
        return (
        <div className="pop-up-form">
            <form className="pop-up-form-container">
                <h1>Room Search</h1>
                <label><b>Name</b></label>
                <input type="text" placeholder="Enter Name" onChange={(e) => this.handleNameChange(e,socket)} value={this.state.name} required />
                
                <div className="search-results">
                    <ul>
                    {
                        searchResults.map(result => {
                            return(
                                <li key={result}>
                                    <button type="button" className="btn-like-link" onClick={(e) => this.handleClick(e, socket, dispatch, result)}>{result}</button>
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
    }
}

const mapStateToProps = store => ({
    socket: store.socket,
    searchResults: store.searchResults
});

export default connect(mapStateToProps)(SearchRoomForm)