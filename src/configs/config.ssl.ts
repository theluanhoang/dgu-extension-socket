import * as fs from "fs";
import { config } from "dotenv";

config();

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH as string, "utf8");
const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH as string, "utf8");
const ca = fs.readFileSync(process.env.CHAIN_PATH as string, "utf8");

const sslConfig = {
    privateKey,
    certificate,
    ca,
};

export = sslConfig;
