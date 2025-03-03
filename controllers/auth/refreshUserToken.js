import fetchUser from "../../services/findUser.js";
import updateUser from "../../services/updateUser.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const refreshUserToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Refresh token is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Invalid refresh token" });
    }

    const user = await fetchUser({ _id: decoded.userId });
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid or expired refresh token" });
    }

    const payload = { userId: user._id, email: user.email, sid: decoded.sid };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    });

    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d"
    });

    console.log("Generated Refresh Token:", newRefreshToken);

    await updateUser(user._id, { refreshToken: newRefreshToken });

    return res.status(StatusCodes.OK).json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    next(err);
  }
};

export default refreshUserToken;
