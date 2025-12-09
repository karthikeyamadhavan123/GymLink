const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://gym-link.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Id", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
module.exports = { app, express, server, io };
