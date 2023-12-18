import { SwaggerTheme } from "swagger-themes";
const theme = new SwaggerTheme("v3");
import { serviceUrl } from "./config.app";
import { HEADER } from "@/utils";

export const configSwagger = {
    swaggerOptions: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "DGU EXTENSION API",
                version: "1.0.0",
                description: "DGU EXTENSION SERVICES API",
                contact: {
                    email: "dgu-extension@gmail.com",
                },
            },
            servers: [
                {
                    url: serviceUrl,
                },
            ],
            components: {
                securitySchemes: {
                    accessToken: {
                        type: "http",
                        scheme: "bearer",
                        in: "header",
                        name: HEADER.AUTHORIZATION,
                        bearerFormat: "JWT",
                    },
                    apiKey: {
                        type: "apiKey",
                        in: "header",
                        name: HEADER.API_KEY,
                    },
                    verifyAdminToken: {
                        type: "apiKey",
                        in: "header",
                        name: HEADER.VERIFY_USER_TOKEN,
                    },
                    verifyForgotPasswordToken: {
                        type: "apiKey",
                        in: "header",
                        name: HEADER.VERIFY_FORGOT_PASSWORD_TOKEN,
                    },
                },
            },
        },
        apis: ["./src/routes/**/*.ts"],
    },
    optionsTheme: {
        explorer: true,
        customCss: theme.getBuffer("dark"),
    },
};
