import { Response, Request } from "express";
import { OK } from "@/core";
import UsageService from "@/services/usage.service";

class UsageController {
    createApiKey = async (req: Request, res: Response) => {
        new OK({
            message: "Create API Key Successfully",
            metaData: await UsageService.createApiKey(req.body),
        }).send(res);
    };

    getApiKey = async (req: Request, res: Response) => {
        new OK({
            message: "Get All API Key Successfully",
            metaData: await UsageService.getApiKey(req.body),
        }).send(res);
    };

    deleteApiKey = async (req: Request, res: Response) => {
        new OK({
            message: "Delete API Key Successfully",
            metaData: await UsageService.deleteApiKey(req.body),
        }).send(res);
    };
}

export default new UsageController();
