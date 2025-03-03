import User from "../../models/userSchema.js";
import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getUserInfo = async (req, res, next) => {
	try {
		const userId = req.user._id;
		console.log("Fetching info for User ID:", userId);

		const user = await User.findById(userId).select("email balance");
		if (!user) {
			console.error("User not found");
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "User not found" });
		}
		console.log("User found:", user);

		const transactions = await Transaction.find({ userId })
			.select("description category amount date _id")
			.lean();
		console.log("Fetched Transactions:", transactions);

		return res.status(StatusCodes.OK).json({
			email: user.email,
			balance: user.balance,
			transactions,
		});
	} catch (error) {
		console.error("Error in getUserInfo:", error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Internal server error" });
	}
};

export default getUserInfo;
