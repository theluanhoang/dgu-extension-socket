import dotenv from "dotenv";
dotenv.config();

const mailServiceConfig = {
    rootMailAdmin: process.env.ROOT_MAIL_ADMIN as string,
    rootPasswordAdmin: process.env.ROOT_PASSWORD_ADMIN as string,
    rootNameAdmin: process.env.ROOT_NAME_ADMIN as string,
    hostMailService: process.env.HOST_MAIL_SERVICE as string,
    portMailService: parseInt(process.env.PORT_MAIL_SERVICE as string),
    userMailService: process.env.USER_MAIL_SERVICE as string,
    passwordMailService: process.env.PASSWORD_MAIL_SERVICE as string,
    secureMailService: process.env.SECURE_MAIL_SERVICE === "true",
};

export = mailServiceConfig;
