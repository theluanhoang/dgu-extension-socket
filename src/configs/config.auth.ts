import dotenv from "dotenv";
dotenv.config();

const configAuth = {
    secretKeyExtension: process.env.SECRET_KEY_EXTENSION as string,
    secretVerifyUser: process.env.SECRET_VERIFY_EMAIL as string,
    secretAccessToken: process.env.SECRET_ACCESS_TOKEN as string,
    secretChangePassword: process.env.SECRET_CHANGE_PASSWORD as string,
};

export = configAuth;
