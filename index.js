const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    socket.broadcast.emit("recive_message", data);
  });
  socket.on("disconnect_user", (data) => {
    console.log("data", data);
  });
});

io.on("disconnect", (socket) => {
  socket.on("disconnect_user", (data) => {
    console.log("data",data)
    socket.broadcast.emit("disconnect user", data);
  });
});

server.listen(3001, () => {
  console.log("Server is running...");
});
