const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/erroMiddleware");

connectDB();
const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("API is Runnig");
});

// app.get("/api/chat", (request, response) => {
//   response.send(chats);
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log("Server started at port 5000"));
