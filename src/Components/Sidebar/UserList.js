import React from 'react';
import { connect } from 'react-redux';


const users = userList => (
    userList.map(user =>
        <li key={user}>
            <button className="btn-like-link">{user}</button>
        </li>)
);

const UserList = ({ userList }) => (
    <div className="user-list">
        <h3>Users</h3>
        <ul>
        {users(userList)}
        </ul>
    </div>
);

const mapStateToProps = store => ({
    userList: store.users
});

export default connect(mapStateToProps)(UserList)