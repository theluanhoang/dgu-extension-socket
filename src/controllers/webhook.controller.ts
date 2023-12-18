import { OK } from "@/core";
import socketService from "@/services/socket.service";
import WebhooksService from "@/services/webhooks.service";
import { Request, Response } from "express";

class WebhookController {
    handleBankTransfer = async (req: Request, res: Response) => {
        new OK({
            message: "Handle Bank Transfer Successfully",
            metaData: await WebhooksService.handleBankTransfer(req.body.data),
        }).send(res);
    };

    notification = async (req: Request, res: Response) => {
        await socketService.handleNotificationPaymentStatus("12345", true);
        new OK({
            message: "Handle Bank Transfer Successfully",
            metaData: "DONE",
        }).send(res);
    };
}

export default new WebhookController();
