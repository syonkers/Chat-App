// Essentials
import React from 'react';
import { connect } from 'react-redux';

// Styles
import './App.css';

// Components
import ChatWindow from './Components/ChatWindow/ChatWindow';
import SendMessageForm from './Components/SendMessageForm';
import IconBar from './Components/Menu/IconBar';
import Sidebar from './Components/Sidebar/Sidebar';
import SignUpForm from './Components/SignUpForm';
import CreateRoomForm from './Components/Menu/CreateRoomForm';
import SearchRoomForm from './Components/Menu/SearchRoomForm';

const App = ({ isAuthenticated, showCreateRoomForm, showSearchRoomForm }) => (
  <div className="App">
      { isAuthenticated ? 
      <div className="Main">
        <ChatWindow />
        <SendMessageForm />
        <IconBar />
        <Sidebar />
        {showCreateRoomForm ? <CreateRoomForm /> : null }
        {showSearchRoomForm ? <SearchRoomForm /> : null }
      </div> : 
      <div className="SignUp">
        <SignUpForm />
      </div>
      }
    </div>
);

const mapStateToProps = store => ({
  isAuthenticated: store.isAuthenticated,
  showCreateRoomForm: store.showCreateRoomForm,
  showSearchRoomForm: store.showSearchRoomForm
});

export default connect(mapStateToProps)(App);
