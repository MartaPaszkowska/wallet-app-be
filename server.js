import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

console.log("Starting server...");

(async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
})();
