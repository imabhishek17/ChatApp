//node server which will handle socket socket io connections
const io=require('socket.io')(8020)

const users={};

io.on('connection', socket=>{
    //if any new user joins, let other users connected to the server
    socket.on('new-user-joined', name =>{
        //console.log("New user", name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone sends the message, broadcast it to all othe people
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //if someone leaves the chat, let others know
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
    