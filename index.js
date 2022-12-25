const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
///////
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

///////////bước setup server side cho socket.io
const expressServer = http.createServer(app);
const io = new Server(expressServer);
////////////////////////////////////////////////

io.on("connection", function (socket) {
  socket.on("chat", function (msg) {
    io.emit("chat_send", msg);
  });
});

expressServer.listen(3000, () => {
  console.log("the server is running on 3000");
});
