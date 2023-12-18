import { audience, client } from "@/configs/config.google";
import { BAD_REQUEST, UNAUTHORIZED } from "@/core";
import { HEADER } from "@/utils";
import { Request } from "express";
import { tokenValidation } from "@/helpers";

export async function verifyIdToken(req: Request) {
    const { error, value } = tokenValidation({ token: req.headers[HEADER.AUTHORIZATION] as string });
    if (error) throw new BAD_REQUEST(error.details[0].message);
    const idToken = value.token;

    if (!idToken) throw new UNAUTHORIZED();

    const ticket = await client.verifyIdToken({
        idToken,
        audience,
    });

    const payload = ticket.getPayload();
    const userId = payload?.sub;

    return userId;
}
