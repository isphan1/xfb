const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router')
// const PORT = process.env.port||'8080'

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

const {addUser,getUser,removeUser,users} =require('./utils') 

io.on('connection', (socket) => {

  socket.on('join',({name,room})=>{

    socket.emit('myId',socket.id)    
    const {error,user} = addUser({id:socket.id,name:name,room:room})
        
    socket.join(user.room)
  })
    socket.on("chatMsg",({msg,id})=>{

      const user = getUser(socket.id)
  
      io.to(user.room).emit('newMsg',{msg:msg,user:user})
  
    })

    socket.on('end',()=>{
      const user = getUser(socket.id)

      removeUser(user.id);

      socket.leave(user.room)
    })

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  })


});

server.listen(process.env.PORT || 5000);