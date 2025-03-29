import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getUserTransactions = async (req, res) => {
	try {
		// Tryb demo — zwracamy przykładowe miesięczne podsumowanie
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json({
				message: "Transactions summary for the demo user",
				transactions: [
					{
						month: 1,
						totalIncome: 3000,
						totalExpense: 1200,
					},
					{
						month: 2,
						totalIncome: 2800,
						totalExpense: 900,
					},
				],
			});
		}

		const userId = req.user._id;

		const transactions = await Transaction.aggregate([
			{
				$match: { userId },
			},
			{
				$group: {
					_id: { $month: "$date" },
					totalIncome: {
						$sum: {
							$cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
						},
					},
					totalExpense: {
						$sum: {
							$cond: [
								{ $eq: ["$type", "expense"] },
								"$amount",
								0,
							],
						},
					},
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);

		const transactionsSummary = transactions.map((item) => ({
			month: item._id,
			totalIncome: item.totalIncome,
			totalExpense: item.totalExpense,
		}));

		return res.status(StatusCodes.OK).json({
			message: "Transactions summary for the user",
			transactions: transactionsSummary,
		});
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Error fetching user transactions",
			error: error.message,
		});
	}
};

export default getUserTransactions;
