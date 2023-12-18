import { UNAUTHORIZED } from "@/core";
import { handleError } from "@/helpers";
import { verifyIdToken } from "@/helpers/verifyIdToken.helper";
import { NextFunction, Request, Response } from "express";

export const authenticationMiddleWare = handleError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = await verifyIdToken(req);

    if (!userId) throw new UNAUTHORIZED("Access Token Invalid");
    req.body.userId = userId;

    return next();
});
