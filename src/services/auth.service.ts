import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { clientUrl } from "@/configs/config.app";
import { secretVerifyUser, secretAccessToken, secretChangePassword } from "@/configs/config.auth";
import { IRequestForgotPassword, IRequestSignIn, IRequestSignUp, IRequestVerifyUser, IUserModel } from "@/types";
import { UserModel } from "@/models";
import { BAD_REQUEST, CONFLICT, FORBIDDEN, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from "@/core";
import {
    EXPIRATION_VERIFY_EMAIL,
    EXPIRES_ACCESS_TOKEN,
    templateSuccessCreateAdmin,
    templateVerifyCreateAdmin,
    templateChangePasswordAdmin,
    ROUTES_CLIENT,
    SUPER_ADMIN_ROLE,
} from "@/utils";
import { handleSendMail } from "@/helpers";
import { rootMailAdmin, rootPasswordAdmin, rootNameAdmin } from "@/configs/config.mailService";

class AuthService {
    signUp = async (requestSignup: IRequestSignUp) => {
        const { email, password } = requestSignup;
        const { active, createdAt }: IUserModel =
            ((await UserModel.findOne({ email }).select(["active", "createdAt"]).lean()) as IUserModel) || {};
        if (active) throw new CONFLICT("Gmail Already Exist", 999);

        if (!active && createdAt) {
            const currentTime = new Date().getTime();
            const createdAtDate = new Date(createdAt).getTime();
            const timeExpiration = currentTime - createdAtDate;
            if (timeExpiration < EXPIRATION_VERIFY_EMAIL) throw new CONFLICT("Gmail Already Exist", 999);
            else {
                const { deletedCount } = await UserModel.deleteOne({ email });
                if (deletedCount === 0) throw new UNPROCESSABLE_ENTITY("Clean User Failed");
            }
        }

        const tokenVerifyUser = JWT.sign({ email }, secretVerifyUser, { expiresIn: "1day" });
        const urlVerifyUser = `${clientUrl}${ROUTES_CLIENT.verifyUser}?email=${email}&token=${tokenVerifyUser}`;

        const passwordHash = await bcrypt.hash(password, 10);
        const createUser = await UserModel.create({ ...requestSignup, password: passwordHash });
        if (!createUser) throw new UNPROCESSABLE_ENTITY("Create User Failed");

        const sendMailVerifyUser = await handleSendMail(rootMailAdmin, {
            subject: "Xác thực tạo tài khoản quản trị viên",
            template: templateVerifyCreateAdmin(email, urlVerifyUser),
        });
        if (!sendMailVerifyUser) throw new UNPROCESSABLE_ENTITY("Send Mail Verify User Failed");

        return { sentEmail: email };
    };

    verifyUser = async ({ email, token }: IRequestVerifyUser) => {
        JWT.verify(token, secretVerifyUser, (error, decoded: any) => {
            if (error) throw new UNPROCESSABLE_ENTITY("Verify User Failed");
            if (decoded?.email != email) throw new UNPROCESSABLE_ENTITY("Verify User Failed");
        });
        const { modifiedCount } = await UserModel.updateOne({ email }, { active: true }).lean();
        if (!modifiedCount) throw new UNPROCESSABLE_ENTITY("Update Active User Failed");

        const sendMailInform = await handleSendMail(email, {
            subject: "Chúc mừng bạn đã trở thành quản trị viên",
            template: templateSuccessCreateAdmin(email),
        });
        if (!sendMailInform) throw new UNPROCESSABLE_ENTITY("Send Mail Inform User Failed");

        return { verifyUser: modifiedCount !== 0 ? true : false };
    };

    signIn = async ({ email, password }: IRequestSignIn) => {
        const holdUser: IUserModel = (await UserModel.findOne({ email })
            .select(["-createdAt", "-updatedAt"])
            .lean()) as IUserModel;
        const { _id: userId, name, password: passwordHash, active, role, avatar } = holdUser || {};

        if (!holdUser) throw new BAD_REQUEST("Gmail Not Already Exist", 998);
        if (!active) throw new FORBIDDEN("Account Is Inactive", 997);

        const checkPassword = await bcrypt.compare(password, passwordHash);
        if (!checkPassword) throw new BAD_REQUEST("Password Is Wrong", 996);

        const accessToken = JWT.sign({ role }, secretAccessToken, { expiresIn: "1day" });

        return {
            user: { userId, name, email, avatar, role },
            accessToken,
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRES_ACCESS_TOKEN),
        };
    };

    forgotPassword = async (email: string) => {
        const { active }: IUserModel =
            ((await UserModel.findOne({ email }).select(["active"]).lean()) as IUserModel) || {};
        if (!active) throw new BAD_REQUEST("Gmail Not Exist", 998);

        const tokenForgotPasswords = JWT.sign({ email }, secretChangePassword, { expiresIn: "1h" });
        const urlForgotPasswords = `${clientUrl}${ROUTES_CLIENT.forgotPassword}?email=${email}&token=${tokenForgotPasswords}`;

        const sendMailForgotPassword = await handleSendMail(email, {
            subject: "Xác thực đổi mật khẩu tài khoản quản trị viên",
            template: templateChangePasswordAdmin(email, urlForgotPasswords),
        });
        if (!sendMailForgotPassword) throw new UNPROCESSABLE_ENTITY("Send Mail Verify User Failed");

        return { sentEmail: email };
    };

    verifyForgotPassword = async ({ email, token, newPassword }: IRequestForgotPassword) => {
        JWT.verify(token, secretChangePassword, (error: any, decoded: any) => {
            if (error) throw new UNAUTHORIZED("Verify Forgot Password Failed");
            if (decoded?.email != email) throw new UNAUTHORIZED("Verify Forgot Password Failed");
        });
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const { modifiedCount } = await UserModel.updateOne({ email }, { password: passwordHash }).lean();
        if (!modifiedCount) throw new UNPROCESSABLE_ENTITY("Update Password User Failed");

        return { forgotPassword: modifiedCount !== 0 ? true : false };
    };

    createRootAdmin = async () => {
        const { email } =
            ((await UserModel.findOne({ email: rootMailAdmin }).select(["email"]).lean()) as IUserModel) || {};
        if (email) return;

        const passwordHash = await bcrypt.hash(rootPasswordAdmin, 10);
        const createRootUserResponse = await UserModel.create({
            email: rootMailAdmin,
            name: rootNameAdmin,
            password: passwordHash,
            role: SUPER_ADMIN_ROLE,
            active: true,
        });

        const sendMailInform = await handleSendMail(rootMailAdmin, {
            subject: "Chúc mừng bạn đã trở thành quản trị viên",
            template: templateSuccessCreateAdmin(rootMailAdmin),
        });
        if (!sendMailInform) throw new FORBIDDEN("Send Mail Inform User Failed");

        return { createRootUserResponse };
    };
}

export default new AuthService();
