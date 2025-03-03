import Transaction from '../models/transactionSchema.js';

const findUserTransactions = async (userId) => {
  try {
    const transactions = await Transaction.find({ userId });
    return transactions;
  } catch (error) {
    throw new Error(`Error fetching transactions for user ${userId}: ${error.message}`);
  }
};

export default findUserTransactions;