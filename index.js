const express = require('express');
const app = express();
require("dotenv").config();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    },
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on("connection", (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);
