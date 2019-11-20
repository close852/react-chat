import express from 'express'
import http from 'http'
import socketio from 'socket.io'
const app = express();
const server = http.createServer(app);

const io = socketio(server);
require('./socketEvents')(io);

const PORT = process.env.PORT || 4000;



server.listen(PORT, (req, res) => {
    console.log(`http://127.0.0.1:${PORT}`)
})

