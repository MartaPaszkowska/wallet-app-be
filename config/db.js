import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

async function connectDB() {
	try {
		await mongoose.connect(uri);
		console.log("Database connection successful");
	} catch (error) {
		console.error("Database connection error:", error.message);
		process.exit(1);
	}
}

export default connectDB;
