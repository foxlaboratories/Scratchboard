const express = require('express');
const socket = require('socket.io');
const app = express();
var rooms = [];


const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log("Server running on port ", PORT));

const io = socket(server, {
    cors: {
      origin: '*',
    }
  });
    



io.on('connection', function(socket){
    socket.on('createRoom', (data) => {
        let guests = [];
        guests.push(data.name);
        let val = { code: socket.id, guests: guests, count: 1};
        rooms.push(val);
        socket.emit('success');
        setTimeout(() => {
            io.to(data.code).emit('userConnection', data.name, val.count, val.guests, socket.id);
        }, 300);
        console.log(data.name, 'created room:', socket.id);
    });
    socket.on('checkRoom', (data) => {
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].code === data.code) {
                io.to(data.code).emit('userConnection', data.name, rooms[i].count, rooms[i].guests, data.code);
            }
        }
    });
    socket.on('joinRoom', (data) => {
        var invalidCode = 0;
        for(var i = 0; i < rooms.length; i++){
            if (rooms[i].code === data.code){
                socket.join(data.code);
                rooms[i].count++;
                rooms[i].guests.push(data.name);
                socket.emit('success', data.name);
                io.to(data.code).emit('userConnection', data.name, rooms[i].count, rooms[i].guests, data.code);
                console.log(data.name, 'joined room:', data.code);
            }else{
                invalidCode++;
            }
        }
        if(invalidCode === rooms.length){
            console.log("Invalid Code");
        }
    });
    socket.on('mouse', (data, code, name) => {
        io.to(code).emit('drawing', data, name);
    });
    socket.on('clear', (code) => {
        io.to(code).emit('clear');
    });
});