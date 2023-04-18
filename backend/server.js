import express from "express";
import db from "./config/Database.js";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';


const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

// testing 
app.get('/', (req, res) => {
  res.json({ success: true, message: "welcome to backend zone"});
});

const server = http.createServer(app);
const io = new Server(server);
// Export the 'io' instance
export { io };
io.on("connection", (socket) => {
  console.log("A user connected!");

  // socket.on("joinRoom", (roomId) => {
  //   console.log(`user joined room ${roomId}`);
  //   socket.join(roomId);
  // });

  // socket.on("message", async (message) => {
  //   console.log(` all message: ${message}`);
  //   const roomId = message.chatRoomId;
  //   await ChatRoom.findAll();
  //   io.to(roomId).emit("AllMessage", message); // emit a new message event to all clients in the room
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected!");
  });
});


const port=process.env.PORT || 8000
server.listen(port, () => console.log(`Server started in port ${port}`));
