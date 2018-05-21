const path = require('path'); //built in module, doens't need to be installed
const http = require('http'); //built in
const express = require('express'); //to set up web server
const socketIO = require('socket.io'); //to communicate between front and backend

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// console.log(__dirname + '/../public'); //old way
// console.log(publicPath);


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
//socket.emit sends a message to only that socket
//io.emit send an event to all connections
io.on('connection',(socket)=>{
  console.log('New user connected');



  socket.on('join', (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required.')
    }
    socket.join(params.room);

    //socket.leave(params.room); //does what you think it does
    // io.emit - emits to all users -> io.to(room).emit - emits to all room members
    // socket.broadcast.emit - emits to all users except current users -> socket.broadcast.to(room).emit
    // socket.emit - send to one user
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();
  });

  socket.on('createMessage',(message, callback)=>{
    // console.log('createdMessage', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port, () =>{
  console.log(`started up at port ${port}`);
});

module.exports = {app};
