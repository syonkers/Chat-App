// Essentials
import React from 'react';
import { connect } from 'react-redux';

// Styles
import './App.css';

// Components
import ChatWindow from './Components/ChatWindow/ChatWindow';
import SendMessageForm from './Components/SendMessageForm';
import SearchBar from './Components/Menu/SearchBar';
import Sidebar from './Components/Sidebar/Sidebar';
import SignUpForm from './Components/SignUpForm';
import SearchRoomForm from './Components/Menu/SearchRoomForm';

const App = ({ isAuthenticated, showSearchRoomForm }) => (
  <div className="App">
      { isAuthenticated ? 
      <div className="Main">
        <ChatWindow />
        <SendMessageForm />
        <SearchBar />
        <Sidebar />
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
  showSearchRoomForm: store.showSearchRoomForm
});

export default connect(mapStateToProps)(App);
