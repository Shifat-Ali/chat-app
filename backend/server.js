const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/erroMiddleware");
const { Server } = require("socket.io");

connectDB();
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("API is Runnig");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(5000, console.log("Server started at port 5000"));
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
    console.log(user);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined the room: " + room);
  });

  socket.on("send message", (message) => {
    if (!message) return;
    var chat = message.chat;

    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;

      socket.in(chat._id).emit("recieve message", message);
    });
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(user._id);
  });
});
