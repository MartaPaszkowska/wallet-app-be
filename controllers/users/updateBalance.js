import User from "../../models/userSchema.js";
import { StatusCodes } from "http-status-codes";

const updateBalance = async (req, res) => {
	try {
		// Tryb demo — nie zapisujemy niczego, tylko udajemy
		if (req.user.role === "guest") {
			return res.status(StatusCodes.OK).json({
				message: "Demo: balance not updated",
				balance: 0,
			});
		}

		const userId = req.user._id;
		const { newBalance } = req.body;

		if (newBalance === undefined || isNaN(newBalance) || newBalance < 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message:
					"Invalid balance value. Balance must be a positive number.",
			});
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ balance: newBalance },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "User not found",
			});
		}

		return res.status(StatusCodes.OK).json({
			message: "Balance updated successfully",
			balance: updatedUser.balance,
		});
	} catch (err) {
		console.error("Error updating balance:", err.message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Failed to update balance",
			error: err.message,
		});
	}
};

export default updateBalance;
