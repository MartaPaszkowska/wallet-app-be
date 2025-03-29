import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getExpenseCat = async (req, res, next) => {
	try {
		const userId = req.user._id;

		const categories = await Transaction.distinct("category", {
			userId,
			type: "expense",
		});

		if (!categories || categories.length === 0) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "No expenase categories found for this user",
			});
		}

		return res.status(StatusCodes.OK).json({ categories });
	} catch (error) {
		console.error("Error fetching expense categories:", error.message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Error fetching expense categories",
			error: error.message,
		});
	}
};

export default getExpenseCat;
