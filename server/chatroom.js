class Chatroom{
    constructor(name) {
        this.id = '_' + Math.random().toString(36).substr(2, 9),
        this.name = name,
        this.users = [],
        this.messages = []
    }

    addUser(socket) {
        this.users.push(socket.username);
        this.users.sort();
    }

    removeUser(socket) {
        this.users.splice( this.users.indexOf(socket.username), 1 );
    }

    addMessage(message) {
        this.messages.push(message);
    }
};

module.exports = Chatroom;