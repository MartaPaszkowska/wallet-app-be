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
