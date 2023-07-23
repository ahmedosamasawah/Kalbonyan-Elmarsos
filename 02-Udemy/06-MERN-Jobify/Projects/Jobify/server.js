import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

import xss from "xss-clean";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/connect.js";

import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

import authenticateUser from "./middleware/auth.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
