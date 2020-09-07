const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const RpsGame = require("./rps-game");

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on("connection", (sock) => {
  // sock.emit('message', 'Hi you are connected');
  if (waitingPlayer) {
    // start a game
    new RpsGame(waitingPlayer, sock);
    //[sock, waitingPlayer].forEach(s => s.emit('message', ' Game starts! '));
    waitingPlayer = null;
  } else {
    waitingPlayer = sock;
    waitingPlayer.emit("message", "في إنتظار خصم ");
  }

  sock.on("message", (text) => {
    io.emit("message", text);
  });
});

const serverInfo = {
  port: 3000,
};

server.on("error", (err) => {
  console.log("Server error");
});

server.listen(serverInfo.port, () => {
  console.log(`the server is running on the Port ${serverInfo.port}`);
});
