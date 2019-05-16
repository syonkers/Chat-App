import React from 'react';
import { connect } from'react-redux';
import toggleCreateRoomForm from '../../Actions/toggleCreateRoomForm';

class CreateRoomForm extends React.Component {
    constructor(){
        super()
        this.state = {
            name: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(e) {
        if (e.target.value.length <= 12) {
            this.setState({
                name: e.target.value
            });
        }
    }

    handleSubmit(e, socket, dispatch) {
        e.preventDefault();
        if (this.state.name) {
            socket.emit('createChatroom', this.state.name);
            this.setState({
                name: '',         
            });
            dispatch(toggleCreateRoomForm());
        }
    }

    render() {
        const { socket, dispatch } = this.props;
        return (
        <div className="pop-up-form">
            <form className="pop-up-form-container">
                <h1>Create new room</h1>

                <label><b>Name (Max 12 characters)</b></label>
                <input type="text" placeholder="Enter Name" onChange={this.handleNameChange} value={this.state.name} required />


                <button type="submit" className="btn" onClick={(e) => this.handleSubmit(e, socket, dispatch)}>Submit</button>
                <button type="submit" className="btn cancel" onClick={() => dispatch(toggleCreateRoomForm())}>Cancel</button>
            </form>
        </div>
        );
    }
}

const mapStateToProps = store => ({
    socket: store.socket,
});

export default connect(mapStateToProps)(CreateRoomForm)