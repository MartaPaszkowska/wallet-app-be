import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

console.log("Starting server...");

(async () => {
	await connectDB();
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running. Use our API on port: ${PORT}`);
	});
})();
