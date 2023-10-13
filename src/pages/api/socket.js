import { Server } from "socket.io";

//TODO rewrite in TS and move to app directory

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("players-change", (data) => {
        console.log("Received update request");
        socket.broadcast.emit("update-players", data);
      });
    });
  }
  res.end();
};

export default SocketHandler;
