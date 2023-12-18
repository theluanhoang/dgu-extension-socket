import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { config } from "dotenv";
import { ESocketEvents } from "@/utils";
import SocketService from "@/services/socket.service";

config();

export class ServerSocket {
    public static instance: ServerSocket;
    public static io: Server;

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        ServerSocket.io = new Server(server, {
            cors: {
                origin: "*",
            },
        });
    }

    public listeners(socket: Socket) {
        console.info("A new client connected with id: " + socket.id);

        socket.on(ESocketEvents.DISCONNECT, async () => {
            await SocketService.handleDisconnect(socket);
        });

        socket.on(ESocketEvents.REGISTER, async (userId: string) => {
            await SocketService.handleRegister(socket, userId);
        });
    }

    public start() {
        ServerSocket.io.on(ESocketEvents.CONNECTION, this.listeners);
        console.info("Socket IO started.");
    }
}
