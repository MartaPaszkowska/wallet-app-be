import fetchUser from "../../services/findUser.js";
import updateUser from "../../services/updateUser.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await fetchUser({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Email doesn't exist or password is incorrect"
      });
    }

    const sid = uuidv4();

    const payload = { userId: user._id, email: user.email, sid };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    });

    await updateUser(user._id, { accessToken, refreshToken, sid });

    return res.status(StatusCodes.OK).json({
      message: "Logged in successfully",
      accessToken,
      refreshToken,
      sid,
      userData: {
        id: user._id,
        email: user.email,
        balance: user.balance,
        allIncome: user.allIncome,
        allExpense: user.allExpense,
        transactions: user.transactions || []
      }
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    next(err);
  }
};

export default loginUser;
