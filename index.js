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

    socket.on('chat-voucher', (msg) => {
        console.log('voucher', msg);
        io.emit('chat-voucher', msg);
    });
    socket.on('notification', (msg) => {
        console.log('notification', msg);
        io.emit('notification', msg);
    });
    socket.on('chat-voucherB', (msg) => {
        console.log('voucherB', msg);
        io.emit('chat-voucherB', msg);
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);
