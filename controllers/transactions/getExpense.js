import Transaction from '../../models/transactionSchema.js';
import { StatusCodes } from 'http-status-codes';

const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Transaction.find({
      userId,
      type: 'expense',
    }).select('description amount date category _id'); 

    if (!expenses || expenses.length === 0) {
      return res.status(StatusCodes.OK).json({ expenses: [] });
   }

    return res.status(StatusCodes.OK).json({ expenses });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Error fetching expenses', error: error.message });
  }
};

export default getExpense;
