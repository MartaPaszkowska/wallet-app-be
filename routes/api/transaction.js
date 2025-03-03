// routes/api/transactions.js
import express from 'express';
import authenticateToken from '../../middleware/authenticateToken.js';
import addIncome from '../../controllers/transactions/addIncome.js';
import getIncome from '../../controllers/transactions/getIncome.js';
import addExpense from '../../controllers/transactions/addExpense.js';  // Importujemy kontroler
import getExpense from '../../controllers/transactions/getExpense.js';
import deleteTransaction from '../../controllers/transactions/deleteTransaction.js';
import getIncomesCat from '../../controllers/transactions/getIncomesCat.js';
import getExpenseCat from '../../controllers/transactions/getExpensesCat.js';
import getPeriodDataTransactions from '../../controllers/transactions/getPeriodDataTransactions.js';
import getUserTransactions from '../../controllers/transactions/getUserTransactions.js';
import addTransaction from '../../controllers/transactions/addTransaction.js';

const router = express.Router();

router.post('/expense', authenticateToken, addExpense);  
router.post('/income', authenticateToken, addIncome);
router.get('/income', authenticateToken, getIncome);
router.get('/expense', authenticateToken, getExpense);
router.delete('/:transactionId', authenticateToken, deleteTransaction);
router.get('/income-categories', authenticateToken, getIncomesCat);
router.get('/expense-categories', authenticateToken, getExpenseCat);
router.get('/period-data', authenticateToken, getPeriodDataTransactions);
router.get('/user-transactions', authenticateToken, getUserTransactions);
router.post('/', authenticateToken, addTransaction);

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - description
 *         - category
 *         - amount
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the transaction
 *         description:
 *           type: string
 *           description: Description of the transaction
 *           example: "Purchase of groceries"
 *         category:
 *           type: string
 *           description: Category of the transaction
 *           enum: [Products, Alcohol, Entertainment, Health, Transport, Housing, Technique, Communal, Communication, Sports, Hobbies, Education, Other, Salary, Bonus]
 *           example: "Products"
 *         amount:
 *           type: number
 *           description: Amount of the transaction
 *           example: 100.5
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the transaction
 *           example: "2024-12-18"
 *         owner:
 *           type: string
 *           description: ID of the user who made the transaction
 *           example: "5f8f8c44b54764421b7168f5"
 */

/**
 * @swagger
 * /transaction/expense:
 *   post:
 *     summary: Add a new expense
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Expense added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /transaction/income:
 *   post:
 *     summary: Add a new income
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Income added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /transaction/income:
 *   get:
 *     summary: Get user's incomes
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's incomes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No incomes found
 */

/**
 * @swagger
 * /transaction/expense:
 *   get:
 *     summary: Get user's expenses
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No expenses found
 */

/**
 * @swagger
 * /transaction/{transactionId}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID transakcji
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /transaction/income-categories:
 *   get:
 *     summary: Get income categories
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of income categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No categories found
 */

/**
 * @swagger
 * /transaction/expense-categories:
 *   get:
 *     summary: Get expense categories
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expense categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No categories found
 */

/**
 * @swagger
 * /transaction/period-data:
 *   get:
 *     summary: Get period transaction data
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Period transaction data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No data found
 */

/**
 * @swagger
 * /transaction/user-transactions:
 *   get:
 *     summary: Get user transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No transactions found
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */



export default router;
