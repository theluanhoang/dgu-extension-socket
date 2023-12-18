import dotenv from "dotenv";
import * as process from "process";

dotenv.config();

const configWebhooks = {
    secureToken: process.env.CASSO_SECURE_TOKEN,
};

export = configWebhooks;
