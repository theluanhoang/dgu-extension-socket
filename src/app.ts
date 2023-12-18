import { configRateLimit } from "@/configs/config.rateLimit";
import { configSwagger } from "@/configs/config.swagger";
import router from "@/routes";
import { LIMIT_BODY_SIZE } from "@/utils";
import compression from "compression";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Express = express();

// Initialize Middleware
app.use(cors());
app.use(express.json({ limit: LIMIT_BODY_SIZE }));
app.use(express.urlencoded({ extended: true, limit: LIMIT_BODY_SIZE }));
app.use(helmet());
app.use(compression());
app.use(rateLimit(configRateLimit));

// Connect Database
import "@/database/init.mongo";

// Initialize Routes
app.use(router);

// Initialize Swagger
const swaggerDocs = swaggerJsdoc(configSwagger.swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, configSwagger.optionsTheme));

// Handle Error
app.use((req: Request, res: Response) => {
    return res.status(404).json({
        message: "Not Found",
    });
});

export default app;
