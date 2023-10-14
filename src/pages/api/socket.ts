import { Server } from "socket.io";

//TODO move to app directory

export default function SocketHandler(req: Request, res: any) {
  if (!res.socket.server.io) {
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
}
