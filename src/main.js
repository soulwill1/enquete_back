const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const createRouter = require("./router/polls");
const cors = require('cors');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.use((req, res, next) => {
  req.io = io;
  next();
});
// Sets up the routes for polls and injects the Socket.io instance (io)
// to enable real-time communication, such as vote updates.
// For version 2 (v2) - Points to a new router with updated handlers
app.use("/api/v1/polls", createRouter(io));

//Initialize server and socket
io.on("connection", (socket) => {
  console.log(`Novo cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
