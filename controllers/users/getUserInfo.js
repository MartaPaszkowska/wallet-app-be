import User from "../../models/userSchema.js";
import Transaction from "../../models/transactionSchema.js";
import { StatusCodes } from "http-status-codes";

const getUserInfo = async (req, res, next) => {
	try {
		// Tryb demo — dane przykładowe
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json({
				email: "guest@demo.com",
				balance: 0,
				transactions: [
					{
						_id: "demo-1",
						description: "Lunch",
						category: "Products",
						amount: 20,
						date: "2024-12-05T10:00:00.000Z",
					},
					{
						_id: "demo-2",
						description: "Salary",
						category: "Salary",
						amount: 3000,
						date: "2024-12-01T09:00:00.000Z",
					},
				],
			});
		}

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
