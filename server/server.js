const path = require('path'); //built in module, doens't need to be installed
const http = require('http'); //built in
const express = require('express'); //to set up web server
const socketIO = require('socket.io'); //to communicate between front and backend

const {generateMessage} = require('./utils/message');
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

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message, callback)=>{
    console.log('createdMessage', message);

    io.emit('newMessage',generateMessage(message.from, message.text));

    callback('This is from the server');
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port, () =>{
  console.log(`started up at port ${port}`);
});

module.exports = {app};
