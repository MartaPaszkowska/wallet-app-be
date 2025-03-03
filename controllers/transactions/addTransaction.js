import Transaction from '../../models/transactionSchema.js'; 
import { StatusCodes } from 'http-status-codes';

const addTransaction = async (req, res) => {
  const { id: userID } = req.user;

  const { description, category, amount, date } = req.body;
  if (!description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Description is required',
      code: StatusCodes.BAD_REQUEST,
    });
  }
  if (!category || !['Products', 'Alcohol', 'Entertainment', 'Health', 'Transport', 'Housing', 'Technique', 'Communal', 'Communication', 'Sports', 'Hobbies', 'Education', 'Other', 'Salary', 'Bonus'].includes(category)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Valid category is required',
      code: StatusCodes.BAD_REQUEST,
    });
  }
  if (!amount || amount <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Amount must be greater than zero',
      code: StatusCodes.BAD_REQUEST,
    });
  }
  if (!date) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Date is required',
      code: StatusCodes.BAD_REQUEST,
    });
  }

  try {
    const transaction = await Transaction.create({
      ...req.body,
      owner: userID,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "ok", code: StatusCodes.CREATED, data: transaction });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, code: StatusCodes.BAD_REQUEST });
  }
};

export default addTransaction;

// Przykłady wartości dla pól:
// description: "Zakup artykułów spożywczych"
// category: "Products"
// amount: 100.5
// date: "2024-12-18"