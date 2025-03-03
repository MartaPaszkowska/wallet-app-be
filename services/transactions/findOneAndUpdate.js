import Transaction from '../../models/transactionSchema.js'; 


const findOneAndUpdate = async (filter, updateData) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      filter, 
      updateData, 
      { new: true } 
    );

    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }


    return updatedTransaction;
  } catch (error) {
    throw new Error(`Error updating transaction: ${error.message}`);
  }
};

export default findOneAndUpdate;
