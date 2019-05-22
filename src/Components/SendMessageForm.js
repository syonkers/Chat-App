import React from 'react';
import { connect } from 'react-redux';

class SendMessageForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    handleSubmit(e, socket, username, currentRoomName) {
        e.preventDefault();
        if (this.state.message.length > 0 ) {
            socket.emit('sendMessage', {
                message: this.state.message,
                username: username,
                destination: currentRoomName
            }); 
            this.setState({
                message: ''
            });
        }   
    }

    render() {
        const {socket, username, currentRoomName } = this.props;
        return (
            <form className="send-message-form" onSubmit={(e) => this.handleSubmit(e, socket, username, currentRoomName )}>
                <input placeholder="Type here and press enter" type='text' onChange={this.handleChange} value={this.state.message} />
            </form>
        )
    }
}

const mapStateToProps = store => ({
    socket: store.socket,
    username: store.username,
    currentRoomName: store.currentRoomName
});

export default connect(mapStateToProps)(SendMessageForm)