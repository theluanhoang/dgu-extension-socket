import JWT from "jsonwebtoken";
import { BAD_REQUEST, UNAUTHORIZED } from "@/core";
import { handleError, apiKeyValidation } from "@/helpers";
import { HEADER } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { secretKeyExtension } from "@/configs/config.auth";

export const verifyApiKeyMiddleware = handleError(async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = apiKeyValidation({ apiKey: req.headers[HEADER.API_KEY] as string });
    if (error) throw new BAD_REQUEST(error.details[0].message);
    const apiKey = value.apiKey;

    const decoded = JWT.verify(apiKey, secretKeyExtension) as { userId: string };
    if (!decoded.userId) throw new UNAUTHORIZED("API Key Invalid");
    req.body.userId = decoded.userId;
    req.body.apiKey = apiKey;

    return next();
});
