import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoute from "./routes/user.route.js"
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js'

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
// app.use('/api/job', jobRoute);
// app.use('/api/application', applicationRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
