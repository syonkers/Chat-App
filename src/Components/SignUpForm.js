import React from 'react'
import { connect } from 'react-redux'

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(e) {
        if (e.target.value.length < 13) {
            this.setState({
                username: e.target.value
            });
        }
    }

    handleSubmit(e, socket) {
        e.preventDefault();
        if (this.state.username) {
            socket.emit('register', this.state.username); 
            this.setState({
                username: ''
            }); 
        }
    }

    render() {
        const { socket} = this.props;
        return (
            <form className="sign-up-form" onSubmit={(e) => this.handleSubmit(e, socket)}>
                <h1>Enter a username</h1>
                <h3>(Max 12 characters)</h3><br></br>
                <input placeholder="Username..." type='text' onChange={this.handleChange} value={this.state.username} />
            </form>
        );
    }
}

const mapStateToProps = store => ({
    socket: store.socket,
    errorMessage: store.errorMessage
});

export default connect(mapStateToProps)(SignUpForm)