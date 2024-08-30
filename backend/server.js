import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";

import authRoutes from './routes/auth.route.js';
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json()); //this will allow us to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  connectDB();
});
