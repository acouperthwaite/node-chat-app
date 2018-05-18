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

io.on('connection',(socket)=>{
  console.log('New user connected');

  // socket.emit from admin text - welcome to the chat app
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  //socket.broadcast from admin - new user joined
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(message)=>{
    console.log('createdMessage', message);
//socket.emit sends a message to only that socket
//io.emit send an event to all connections
    io.emit('newMessage',generateMessage(message.from, message.text));
    //broadcast will send to all connections except the one sending it
    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port, () =>{
  console.log(`started up at port ${port}`);
});

module.exports = {app};
