import { ServerSocket } from "@/configs/config.socket";
import { ESocketEvents } from "@/utils";
import { Socket } from "socket.io";

class SocketService {
    handleDisconnect = async (socket: Socket) => {
        console.info(`Client with id <${socket.id}> disconnected`);
    };

    handleRegister = async (socket: Socket, userId: string) => {
        socket.join(userId);
    };

    handleNotificationPaymentStatus = async (userId: string, result: boolean) => {
        ServerSocket.io.to(userId).emit(ESocketEvents.PAYMENT_STATUS, { result });
        console.info(`Sent payment status for user with id: ${userId}`);
    };
}

export default new SocketService();
