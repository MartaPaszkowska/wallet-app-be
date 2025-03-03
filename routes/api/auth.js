import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import registerUser from "../../controllers/auth/registerUser.js";
import loginUser from "../../controllers/auth/loginUser.js";
import logoutUser from "../../controllers/auth/logoutUser.js";
import refreshUserToken from "../../controllers/auth/refreshUserToken.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema
} from "../../middleware/validationSchemas.js";

const router = express.Router();

router.get(
  "/google",
  (req, res, next) => {
    console.log("Attempting to authenticate with Google");
    next();
  },
  passport.authenticate("google")
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  (req, res) => {
    const user = req.user;

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Logged in successfully with Google",
      accessToken,
      refreshToken,
      userData: {
        id: user._id,
        email: user.email,
        balance: user.balance
      }
    });
  }
);

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.post("/refresh", validateRequest(refreshTokenSchema), refreshUserToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Backend-generated unique identifier.
 *         email:
 *           type: string
 *           description: E-mail address.
 *           example: "across@mail.com"
 *         password:
 *           type: string
 *           description: Password.
 *           example: "examplepwd12345"
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: E-mail address.
 *           example: "across@mail.com"
 *         password:
 *           type: string
 *           description: Password.
 *           example: "examplepwd12345"
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - sid
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Session's ('sid' field after authentication)


 *           example: "507f1f77bcf86cd799439011"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh user token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

export default router;
