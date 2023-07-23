import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import produdctRoutes from "./routes/productRoutes.js";

dotenv.config();

//connecting to database
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes

//app.post("/api/v1/auth/login", (req, res) => {res.send("posted");});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", produdctRoutes)

app.get("/", (req, res) => {
  res.send("<h1>hello dear</h1>");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT} mode on port ${process.env.PORT}`.bgCyan.white
  );
});
