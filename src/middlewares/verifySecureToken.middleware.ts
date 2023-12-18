import { secureToken } from "@/configs/config.webhook";
import { UNAUTHORIZED } from "@/core";
import { handleError } from "@/helpers";
import { HEADER } from "@/utils";
import { NextFunction, Request, Response } from "express";

export const verifySecureTokenMiddleware = handleError(async (req: Request, res: Response, next: NextFunction) => {
    const secureTokenHeader = req.headers[HEADER.SECURE_TOKEN];

    if (!secureTokenHeader) throw new UNAUTHORIZED("Missing secure token");

    if (secureTokenHeader !== secureToken) throw new UNAUTHORIZED("Wrong secure token");

    return next();
});
