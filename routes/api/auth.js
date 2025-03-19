import express from "express";
import registerUser from "../../controllers/auth/registerUser.js";
import loginUser from "../../controllers/auth/loginUser.js";
import logoutUser from "../../controllers/auth/logoutUser.js";
import refreshUserToken from "../../controllers/auth/refreshUserToken.js";
import authenticateToken from "../../middleware/authenticateToken.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import {
	registerSchema,
	loginSchema,
	refreshTokenSchema,
} from "../../middleware/validationSchemas.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.post("/refresh", validateRequest(refreshTokenSchema), refreshUserToken);

export default router;
