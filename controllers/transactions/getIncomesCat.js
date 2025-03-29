import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getIncomesCat = async (req, res, next) => {
	try {
		// Tryb demo — zwracamy przykładowe kategorie
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json(["Salary", "Bonus"]);
		}

		const categories = await Transaction.distinct("category", {
			userId: req.user._id,
			type: "income",
		});

		if (!categories || categories.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "No income categories found",
			});
		}

		return res.status(StatusCodes.OK).json(categories);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Error fetching income categories",
			error: error.message,
		});
	}
};

export default getIncomesCat;
