import express, { Router } from "express";
import { Ask } from "@/routes/asks/asks.router";
import { Usage } from "@/routes/usage/usage.router";
import { Webhook } from "@/routes/webhooks/webhooks.router";
import { Auth } from "@/routes/auth/auth.router";

const router: Router = express.Router();

router.use("/api/v1", Ask);
router.use("/api/v1", Usage);
router.use("/api/v1", Webhook);
router.use("/api/v1", Auth);

export default router;
