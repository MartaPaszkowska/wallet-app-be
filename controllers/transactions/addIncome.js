import User from '../../models/userSchema.js';
import Transaction from '../../models/transactionSchema.js';
import { StatusCodes } from 'http-status-codes';

const addIncome = async (req, res) => {
  try {
    const { description, category, amount, date } = req.body;
    const userId = req.user._id;
  
    const validIncomeCategories = ["Salary", "Bonus"];
    if (!validIncomeCategories.includes(category)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User ID, description, category, amount, and date are required',
      });
    }

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Amount must be a positive number',
      });
    }

    const newIncome = new Transaction({
      description,
      category,
      amount,
      type: 'income',
      date: new Date(date).toISOString(),
      userId,
    });

    await newIncome.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { allIncome: amount, balance: amount },
        $push: { transactions: newIncome._id },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    return res.status(StatusCodes.CREATED).json({
      message: 'Income added successfully',
      income: newIncome,
    });
  } catch (error) {
    console.error('Error adding income:', error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error adding income',
      error: error.message,
    });
  }
};

export default addIncome;