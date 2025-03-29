import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getIncome = async (req, res) => {
	try {
		// Tryb demo — zwracamy przykładowe dane
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json({
				incomes: [
					{
						_id: "demo-inc-1",
						description: "Salary",
						amount: 3000,
						date: "2024-12-01T09:00:00.000Z",
						category: "Salary",
					},
					{
						_id: "demo-inc-2",
						description: "Freelance project",
						amount: 800,
						date: "2024-12-05T14:00:00.000Z",
						category: "Bonus",
					},
				],
			});
		}

		const userId = req.user._id;

		const incomes = await Transaction.find({
			userId,
			type: "income",
		}).select("description amount date category _id");

		if (!incomes || incomes.length === 0) {
			return res.status(StatusCodes.OK).json({ incomes: [] });
		}

		return res.status(StatusCodes.OK).json({ incomes });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Error fetching incomes", error: error.message });
	}
};

export default getIncome;
