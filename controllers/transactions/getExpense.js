import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getExpense = async (req, res) => {
	try {
		// Tryb demo — zwracamy przykładowe dane
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json({
				expenses: [
					{
						_id: "demo-exp-1",
						description: "Lunch",
						amount: 25,
						date: "2024-12-01T12:00:00.000Z",
						category: "Products",
					},
					{
						_id: "demo-exp-2",
						description: "Bus ticket",
						amount: 8,
						date: "2024-12-03T08:30:00.000Z",
						category: "Transport",
					},
				],
			});
		}

		const userId = req.user._id;

		const expenses = await Transaction.find({
			userId,
			type: "expense",
		}).select("description amount date category _id");

		if (!expenses || expenses.length === 0) {
			return res.status(StatusCodes.OK).json({ expenses: [] });
		}

		return res.status(StatusCodes.OK).json({ expenses });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Error fetching expenses", error: error.message });
	}
};

export default getExpense;
