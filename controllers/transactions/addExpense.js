import Transaction from "../../models/transactionSchema.js";
import User from "../../models/userSchema.js";
import { StatusCodes } from "http-status-codes";

const addExpense = async (req, res) => {
	try {
		const { description, category, amount, date } = req.body;
		const userId = req.user._id;

		const validCategories = [
			"Products",
			"Alcohol",
			"Entertainment",
			"Health",
			"Transport",
			"Housing",
			"Technique",
			"Communal, Communication",
			"Sports, Hobbies",
			"Education",
			"Other",
		];

		if (
			!description ||
			typeof description !== "string" ||
			!description.trim()
		) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "Description must be a non-empty string",
			});
		}

		if (!category || !validCategories.includes(category)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "Invalid category",
			});
		}

		if (!amount || typeof amount !== "number" || amount <= 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "Amount must be a number greater than 0",
			});
		}

		if (!date || isNaN(Date.parse(date))) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "Invalid or missing date",
			});
		}

		const newExpense = new Transaction({
			description,
			category,
			amount,
			type: "expense",
			date: new Date(date).toISOString(),
			userId,
		});
		await newExpense.save();

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				$push: { transactions: newExpense._id },
				$inc: { allExpense: amount, balance: -amount },
			},
			{ new: true }
		);

		if (!updatedUser) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "User not found" });
		}

		return res.status(StatusCodes.CREATED).json({
			message: "Expense added successfully",
			expense: newExpense,
			user: updatedUser,
		});
	} catch (error) {
		console.error("Error adding expense:", error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Error adding expense", error: error.message });
	}
};

export default addExpense;
