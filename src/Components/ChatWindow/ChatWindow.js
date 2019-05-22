import React from 'react';
import { connect } from 'react-redux';

let counter = 1;

const messageList = messages => (
    messages.map(i =>  {
        let time = new Date(i.time).toString();
        return(
        <div className="message" key={counter++}> 
            <div className="message-username">{i.username}</div>
            <div className="message-timestamp">{time}</div>
            <div className="message-box">
                <div className="message-text">{i.message}</div>
            </div>
        </div>)
    })
);

const ChatWindow = ({ messages }) => (
    <div className="chat-window">
        {messageList(messages)}
    </div>
);



const mapStateToProps = store => ({
    messages: store.messages
});
    
export default connect(mapStateToProps)(ChatWindow)

