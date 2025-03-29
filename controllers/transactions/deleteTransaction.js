import Transaction from "../../models/transactionSchema.js";
import User from "../../models/userSchema.js";
import { StatusCodes } from "http-status-codes";

const deleteTransaction = async (req, res, next) => {
	const { transactionId } = req.params;

	// Tryb demo — nic nie usuwamy, tylko udajemy
	if (req.user.role === "guest") {
		return res.status(StatusCodes.OK).json({
			message: "Demo: transaction not deleted",
			transactionId,
		});
	}

	try {
		const transaction = await Transaction.findByIdAndDelete(transactionId);

		if (!transaction) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "Transaction not found" });
		}

		const user = await User.findByIdAndUpdate(
			transaction.userId,
			{ $pull: { transactions: transactionId } },
			{ new: true }
		);

		if (user) {
			if (transaction.type === "income") {
				user.allIncome -= transaction.amount;
			} else {
				user.allExpense -= transaction.amount;
			}

			user.balance = user.allIncome - user.allExpense;

			await user.save();
		}

		res.status(StatusCodes.OK).json({
			message: "Transaction deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

export default deleteTransaction;
