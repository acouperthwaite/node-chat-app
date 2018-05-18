const path = require('path'); //built in module, doens't need to be installed
const http = require('http'); //built in
const express = require('express'); //to set up web server
const socketIO = require('socket.io'); //to communicate between front and backend


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

  // socket.emit('newEmail',{
  //   from:"mike@example.com",
  //   text:"Hey. What's going on?",
  //   createdAt: 1232
  // });
  socket.emit('newMessage',{
    from: "Jane",
    text: "text for newMessage",
    createdAt: 12342
  });

  // socket.on('createEmail', (newEmail)=> {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage',(message)=>{
    console.log('createdMessage', message);
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port, () =>{
  console.log(`started up at port ${port}`);
});

module.exports = {app};
