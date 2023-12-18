import { Response, Request } from "express";
import { BAD_REQUEST, CREATE, OK } from "@/core";
import AuthService from "@/services/auth.service";
import {
    forgotPasswordValidation,
    signInValidation,
    signUpValidation,
    verifyForgotPasswordValidation,
    verifyAdminValidation as verifyUserValidation,
} from "@/helpers";
import { HEADER } from "@/utils";

class AuthController {
    signUp = async (req: Request, res: Response) => {
        const { error, value } = signUpValidation(req.body);
        if (error) throw new BAD_REQUEST(error.details[0].message, 99);
        new CREATE({
            message: "Send Mail Verify Account Successfully",
            metaData: await AuthService.signUp(value),
        }).send(res);
    };

    verifyUser = async (req: Request, res: Response) => {
        const { error, value } = verifyUserValidation({
            token: req.headers[HEADER.VERIFY_USER_TOKEN],
            email: req.body.email,
        });
        if (error) throw new BAD_REQUEST(error.details[0].message, 99);
        new OK({
            message: "Verify User Successfully",
            metaData: await AuthService.verifyUser(value),
        }).send(res);
    };

    signIn = async (req: Request, res: Response) => {
        const { error, value } = signInValidation(req.body);
        if (error) throw new BAD_REQUEST(error.details[0].message, 99);
        new OK({
            message: "SignIn User Successfully",
            metaData: await AuthService.signIn(value),
        }).send(res);
    };

    forgotPassword = async (req: Request, res: Response) => {
        const { error, value } = forgotPasswordValidation(req.body);
        if (error) throw new BAD_REQUEST(error.details[0].message, 99);
        new OK({
            message: "Forgot Password Admin Successfully",
            metaData: await AuthService.forgotPassword(value.email),
        }).send(res);
    };

    verifyForgotPassword = async (req: Request, res: Response) => {
        const { error, value } = verifyForgotPasswordValidation({
            token: req.headers[HEADER.VERIFY_FORGOT_PASSWORD_TOKEN],
            email: req.body.email,
            newPassword: req.body.newPassword,
        });
        if (error) throw new BAD_REQUEST(error.details[0].message, 99);
        new OK({
            message: "Verify Forgot Password Admin Successfully",
            metaData: await AuthService.verifyForgotPassword(value),
        }).send(res);
    };
}

export default new AuthController();
