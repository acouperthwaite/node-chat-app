const path = require('path'); //built in module, doens't need to be installed
const http = require('http'); //built in
const express = require('express'); //to set up web server
const socketIO = require('socket.io'); //to communicate between front and backend

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// console.log(__dirname + '/../public'); //old way
// console.log(publicPath);


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));
//socket.emit sends a message to only that socket
//io.emit send an event to all connections
io.on('connection',(socket)=>{
  console.log('New user connected');



  socket.on('join', (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave(params.room); //does what you think it does
    // io.emit - emits to all users -> io.to(room).emit - emits to all room members
    // socket.broadcast.emit - emits to all users except current users -> socket.broadcast.to(room).emit
    // socket.emit - send to one user
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();
  });

  socket.on('createMessage',(message, callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    var user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
    var user = users.removeUser(socket.id);
    if (user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
  });
});

server.listen(port, () =>{
  console.log(`started up at port ${port}`);
});

module.exports = {app};
