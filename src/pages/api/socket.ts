import { GameData, Player } from "@/types/Initiative";
import { Server, Socket } from "socket.io";

let initiativeData: GameData = {
  order: [],
  turn: 1,
  shouldTTS: false,
  players: [],
};

function log(message: string, socket: Socket) {
  console.info(
    `[Init] ${message} (${socket.id}) | ${socket.handshake.auth.email}`
  );
}

export default function SocketHandler(req: Request, res: any) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // -- setup --
      log(`Connection accepted`, socket);
      const newPlayer: Player = {
        nickname: socket.handshake.auth.nickname ?? "Spectator",
        email: socket.handshake.auth.email,
        socketId: socket.id,
      };

      initiativeData.players = [...initiativeData.players, newPlayer].toSorted(
        (a, b) => b.nickname.localeCompare(a.nickname)
      );
      socket.emit("update-characters", initiativeData);

      // -- handlers --
      socket.on("characters-change", (data: GameData) => {
        log(`Received update request`, socket);
        initiativeData = { ...initiativeData, ...data };
        socket.broadcast.emit("update-characters", initiativeData);
      });

      socket.on("force-refresh", () => {
        log(`Force refresh`, socket);
        socket.broadcast.emit("reload");
      });

      socket.on("disconnect", () => {
        log(`Connection closed`, socket);
        initiativeData.players = initiativeData.players.filter(
          (player) => player.email != socket.handshake.auth.email
        );
        socket.broadcast.emit("update-characters", initiativeData);
      });
    });
  }
  res.end();
}
