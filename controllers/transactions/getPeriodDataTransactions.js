import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getPeriodDataTransactions = async (req, res, next) => {
	try {
		const { date } = req.query;

		if (!date || !/^\d{4}-\d{2}$/.test(date)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "Bad request (invalid 'date' format)",
			});
		}

		// Tryb demo — zwracamy przykładowe podsumowanie
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json({
				incomes: {
					total: 3800,
					incomesData: {
						Salary: {
							total: 3000,
							Salary: 3000,
						},
						Bonus: {
							total: 800,
							Freelance: 800,
						},
					},
				},
				expenses: {
					total: 400,
					incomesData: {
						Products: {
							total: 250,
							Groceries: 250,
						},
						Transport: {
							total: 150,
							"Train ticket": 150,
						},
					},
				},
			});
		}

		const [year, month] = date.split("-");
		const startDate = new Date(`${year}-${month}-01`);
		const endDate = new Date(`${year}-${month}-31`);

		const userId = req.user._id;

		const transactions = await Transaction.find({
			userId,
			date: { $gte: startDate, $lte: endDate },
		});

		const summary = {
			incomes: {
				total: 0,
				incomesData: {},
			},
			expenses: {
				total: 0,
				incomesData: {},
			},
		};

		transactions.forEach((transaction) => {
			const { category, amount, description, type } = transaction;
			const target =
				type === "income" ? summary.incomes : summary.expenses;

			if (!target.incomesData[category]) {
				target.incomesData[category] = { total: 0 };
			}

			target.incomesData[category].total += amount;
			target.total += amount;
			target.incomesData[category][description] =
				(target.incomesData[category][description] || 0) + amount;
		});

		return res.status(StatusCodes.OK).json(summary);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Error fetching period data transactions",
			error: error.message,
		});
	}
};

export default getPeriodDataTransactions;
