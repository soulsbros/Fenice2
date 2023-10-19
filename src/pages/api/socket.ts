import { GameData } from "@/types/Initiative";
import { Server } from "socket.io";

//TODO move to app directory

let initiativeData: GameData = { order: [], turn: 1 };

export default function SocketHandler(req: Request, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.info(`Connection accepted, id ${socket.id}`);
      socket.emit("update-players", initiativeData);

      socket.on("players-change", (data: GameData) => {
        console.info(`Received update request from ${socket.id}`);
        initiativeData = data;
        socket.broadcast.emit("update-players", data);
      });
    });
  }
  res.end();
}
