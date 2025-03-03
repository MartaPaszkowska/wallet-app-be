import express from 'express';
import updateBalance from '../../controllers/users/updateBalance.js';
import getUserInfo from '../../controllers/users/getUserInfo.js';
import authenticateToken from '../../middleware/authenticateToken.js';

const router = express.Router();

router.patch('/balance', authenticateToken, updateBalance);
router.get('/', authenticateToken, getUserInfo);

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
 *     BalanceUpdate:
 *       type: object
 *       required:
 *         - balance
 *       properties:
 *         balance:
 *           type: number
 *           description: New balance value
 *           example: 1000.50
 */

/**
 * @swagger
 * /user/balance:
 *   patch:
 *     summary: Update user's balance
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BalanceUpdate'
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get information about the current user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

export default router;
