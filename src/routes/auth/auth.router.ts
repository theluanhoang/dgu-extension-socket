import express, { Router } from "express";
import AuthController from "@/controllers/auth.controller";
import { handleError } from "@/helpers";

const router: Router = express.Router();

router.post("/sign-up", handleError(AuthController.signUp));
/**
 * @swagger
 * /sign-up:
 *   post:
 *     tags: [Authentication]
 *     summary: Sign up a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "user"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Send Mail Verify Account Successfully"
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 metaData:
 *                   type: object
 *                   properties:
 *                     sentEmail:
 *                       type: string
 *                       example: "user@example.com"
 *       409:
 *         description: Gmail Already Exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Gmail Already Exist"
 *                 code:
 *                   type: integer
 *                   example: 999
 */

router.post("/sign-in", handleError(AuthController.signIn));
/**
 * @swagger
 * /sign-in:
 *   post:
 *     tags: [Authentication]
 *     summary: Sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User signed in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SignIn User Successfully"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 metaData:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: string
 *                           example: "657d0b091a8c19178ed7af87"
 *                         name:
 *                           type: string
 *                           example: "user"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         avatar:
 *                           type: string
 *                           example: "https://res.cloudinary.com/dcrr9jwau/image/upload/v1702658555/DGU/avatar-admin.jpg"
 *                         role:
 *                           type: string
 *                           example: "001"
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiMDAxIiwiaWF0IjoxNzAyNjkzODQ2LCJleHAiOjE3MDUxOTk0NDZ9.2uNX9CxWCBiRryCAT9QsiG8cJrHGk-8aMb938ltzgy8"
 *                     expiresIn:
 *                       type: integer
 *                       example: 1705199446412
 *
 *       400(0):
 *         description: Gmail Not Already Exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Gmail Not Already Exist"
 *                 code:
 *                   type: integer
 *                   example: 998
 *       403:
 *         description: Account Is Inactive.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Account Is Inactive"
 *                 code:
 *                   type: integer
 *                   example: 997
 *       400(1):
 *         description: Password Is Wrong.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Password Is Wrong"
 *                 code:
 *                   type: integer
 *                   example: 996
 */

router.post("/verify-user", handleError(AuthController.verifyUser));
/**
 * @swagger
 * /verify-user:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify a admin's email address
 *     security:
 *       - verifyAdminToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: User verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verify User Successfully"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 metaData:
 *                   type: object
 *                   properties:
 *                     verifyUser:
 *                       type: boolean
 *                       example: true
 *       422:
 *         description: Unprocessable Entity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Verify User Failed"
 *                 code:
 *                   type: integer
 *                   example: 1000
 */

router.post("/forgot-password", handleError(AuthController.forgotPassword));
/**
 * @swagger
 * /forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request a forgot password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Password change requested successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forgot Password Admin Successfully"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 metaData:
 *                   type: object
 *                   properties:
 *                     sentEmail:
 *                       type: string
 *                       example: "user@example.com"
 *       403:
 *         description: Gmail Not Exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Gmail Not Exist"
 *                 code:
 *                   type: integer
 *                   example: 998
 */

router.post("/verify-forgot-password", handleError(AuthController.verifyForgotPassword));
/**
 * @swagger
 * /verify-forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify the password forgot request
 *     security:
 *       - verifyForgotPasswordToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verify Forgot Password Admin Successfully"
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 metaData:
 *                   type: object
 *                   properties:
 *                     forgotPassword:
 *                       type: boolean
 *                       example: true
 *
 *       422:
 *         description: Unprocessable Entity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Verify Forgot Password Failed"
 *                 code:
 *                   type: integer
 *                   example: 1000
 */

export { router as Auth };
