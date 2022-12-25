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
  socket.join("kitchen-room");
  let sizeOfKitchen = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets
    .in("kitchen-room")
    .emit("cooking", "hi i am cooking = " + sizeOfKitchen);
  io.sockets
    .in("kitchen-room")
    .emit("boiling", "hi i am boiling = " + sizeOfKitchen);

  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "hi i am sleeping = ");
  io.sockets.in("bed-room").emit("rest", "hi i am in rest");
});

expressServer.listen(3000, () => {
  console.log("the server is running on 3000");
});
