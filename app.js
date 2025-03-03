import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "./middleware/passportConfig.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swaggerConfig.js";

import authRouter from "./routes/api/auth.js";
import transactionRouter from "./routes/api/transaction.js";
import userRouter from "./routes/api/user.js";

import authenticateToken from "./middleware/authenticateToken.js";

import "./middleware/googlePassportConfig.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));

// Logowanie zmiennej środowiskowej
console.log("Environment:", process.env.NODE_ENV);

// CORS configuration - only development and production of frontend can fetch data
// const corsOptions = {
//   development: {
//     origin: ["http://localhost:5173", "http://localhost:3000"],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   },
//   production: {
//     origin: "https://fe-kapusta-team-project.vercel.app",
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   }
// };

// const environment = process.env.NODE_ENV || "development";
// if (!corsOptions[environment]) {
//   throw new Error(
//     `Invalid NODE_ENV: ${environment}. Please set it to "development" or "production".`
//   );
// }
// app.use(cors());

const corsOptions = {
  origin: [
    "https://fe-kapusta-team-project.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Location"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

// API DOCUMENTATION
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTING
app.use("/auth", authRouter);
app.use("/transaction", authenticateToken, transactionRouter);
app.use("/user", authenticateToken, userRouter);

// MIDDLEWARE - ERRORS
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

export default app;
