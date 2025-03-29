import passport from "./passportConfig.js";

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token === "guest-token") {
		req.user = {
			email: "guest@demo.com",
			role: "guest",
		};
		return next();
	}
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		if (err) {
			return res.status(500).json({ error: "Internal Server Error" });
		}

		if (!user) {
			if (info?.name === "TokenExpiredError") {
				return res
					.status(403)
					.json({ error: "Token expired. Please log in again." });
			}
			return res
				.status(401)
				.json({ error: "Unauthorized. Invalid token." });
		}

		req.user = user;
		next();
	})(req, res, next);
};

export default authenticateToken;
