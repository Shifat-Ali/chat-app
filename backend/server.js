const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/erroMiddleware");

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

app.listen(5000, console.log("Server started at port 5000"));
