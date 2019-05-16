const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;
const Chatroom = require('./chatroom');

const defaultRoom = new Chatroom("default");
io.rooms = [defaultRoom];


io.on('connection', function(socket){
    console.log('a user has connected');

    // Handler for when user first logs in
    socket.on('register', function(username){
        if (Object.values(io.sockets.sockets).filter(socket => socket.username === username.toLowerCase()).length > 0) {
            io.to(socket.id).emit('userError', "Username already in use");
        } else {
            // give socket additional variables
            socket.username = username.toLowerCase();
            socket.joinedRooms = [];

            // subscribe user to default room
            defaultRoom.addUser(socket);
            socket.join(defaultRoom.name);
            socket.joinedRooms.push(defaultRoom.name);

            // send login confirmation back to user with starting info 
            io.to(socket.id).emit('register', {
                isAuthenticated: true,
                username: socket.username,
                currentRoomName: defaultRoom.name,
                joinedRooms: socket.joinedRooms,
                messages: defaultRoom.messages
            });

            // update all users that a new user has joined
            io.to(defaultRoom.name).emit('updateUsers', defaultRoom.users);
        }   
    });


    // Handler for when user wants to search for a chatroom
    socket.on('searchChatrooms', function(searchString) {
        let searchResults = io.rooms.filter(room => room.name.includes(searchString)).map(room => room.name);
        io.to(socket.id).emit('searchResults', searchResults);
    });



    // Handler for when user joins a new chatroom
    socket.on('joinChatroom', function(roomName) {
        // make sure socket isn't trying to join their current room ( should also be blocked on client )
        if (getCurrentRoomName() != roomName ) {
            let currentRoom = getRoomFromName(getCurrentRoomName());
            let targetRoom = getRoomFromName(roomName);

            // If the new room is one the socket has not joined previously / left
            if (!socket.joinedRooms.includes(roomName)) {
                socket.joinedRooms.push(targetRoom.name);
                socket.joinedRooms.sort();
                io.to(socket.id).emit('updateRooms', socket.joinedRooms);
            }

            changeCurrentRoom(currentRoom, targetRoom);
        }
    });



    // Handler for when user leaves a chatroom
    socket.on('leaveChatroom', function(roomName){
        socket.leave(roomName);
        socket.joinedRooms.splice(socket.joinedRooms.indexOf(roomName), 1);

        let targetRoom = getRoomFromName(roomName);
        targetRoom.removeUser(socket);
        
        io.to(roomName).emit('updateUsers', targetRoom.users);
        io.to(socket.id).emit('updateRooms', socket.joinedRooms);
    });



    // Handler for when user sends a message
    socket.on('sendMessage', function(data) {
        let targetRoom = getRoomFromName(data.destination);
        targetRoom.addMessage(data);
        io.to(data.destination).emit('receiveMessage', data);
    });



    // Handler for when user sends a private message
    socket.on('sendPrivate', function(data) {
        io.to(data.to).emit('receivePrivate', {
            origin: socket.username,
            message: data.msg
        });
    });



    // Handler for when user wants to create a chatroom
    socket.on('createChatroom', function(roomData) {
        let roomName = roomData.toLowerCase();
        if (io.rooms.some(room => room['name'] === roomName )) {
            console.log("already in use");
        } else {
            let newRoom = new Chatroom(roomName);

            io.rooms.push(newRoom);
            socket.joinedRooms.push(newRoom.name);
            socket.joinedRooms.sort();
            io.to(socket.id).emit('updateRooms', socket.joinedRooms);

            let currentRoom = getRoomFromName(getCurrentRoomName());
            changeCurrentRoom(currentRoom, newRoom);
        }
    });



    // Handler for when user needs the list of current public chatrooms
    socket.on('getChatroomList', function() {
        io.to(socket.id).emit('availableRooms', sendPublicChatroomData());
    });



    // Handler for when user disconnects
    socket.on('disconnect', function() {
        console.log('socket disconnect...', socket.id);
        // remove user from all custom chatroom objects
        io.rooms.forEach(room => {
            if (room.users.includes(socket.username)) {
                room.users.splice( room.users.indexOf(socket.username), 1 );
                io.to(room.name).emit('updateUsers', room.users);
            }
        });
    });



    // Handler for any error received from socket
    socket.on('error', function(err){
        console.log('received error from socket: ', socket.id);
        console.log(err);
    });



    function changeCurrentRoom(currentRoom, targetRoom) {
        if (currentRoom) {
            socket.leave(currentRoom.name);
            currentRoom.removeUser(socket);
            io.to(currentRoom.name).emit('updateUsers', currentRoom.users);
        }

        socket.join(targetRoom.name);
        targetRoom.addUser(socket);

        io.to(targetRoom.name).emit('updateUsers', targetRoom.users);
        io.to(socket.id).emit('updateMessages', targetRoom.messages);
        io.to(socket.id).emit('updateCurrentRoom', targetRoom.name);
    }



    function getCurrentRoomName() {
        return Object.keys(io.sockets.adapter.sids[socket.id]).filter(item => item!=socket.id)[0];
    }



    function getRoomFromName(name) {
        return io.rooms.find(function(room) {
            return room.name === name;
        });
    }
});

server.listen(port, function(){
    console.log('listening on *:' + port);
});


function sendPublicChatroomData() {
    return io.rooms.filter(x => !x.private).map(y => y.name);
}