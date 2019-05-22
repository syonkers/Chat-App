import React from 'react';

import ChatroomList from './ChatroomList';
import UserList from './UserList';

const Sidebar = () => (
    <div className='sidebar'>
        <ChatroomList />
        <UserList />
    </div>
);

export default Sidebar