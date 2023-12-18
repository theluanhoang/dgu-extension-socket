import { createTransport, Transporter } from "nodemailer";
import {
    hostMailService,
    passwordMailService,
    portMailService,
    userMailService,
    secureMailService,
} from "@/configs/config.mailService";
import { IContent } from "@/types";

export const handleSendMail = async (email: string, content: IContent) => {
    let transporter: Transporter = createTransport({
        host: hostMailService,
        port: portMailService,
        secure: secureMailService,
        auth: {
            user: userMailService,
            pass: passwordMailService,
        },
    });

    const info = await transporter.sendMail({
        from: '"DGU EXTENSION" <noreply@dgu.io.vn>',
        to: email,
        subject: content.subject,
        html: content.template,
    });

    return info.messageId || null;
};
