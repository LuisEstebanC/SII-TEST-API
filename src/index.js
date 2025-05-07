import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cardRoutes from "./routes/cardRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// error handling middleware
app.use(errorHandler);
// routes
app.use("/api", cardRoutes);

//test
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`Connected to database: ${result.rows[0].current_database}`);
});

//server on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
