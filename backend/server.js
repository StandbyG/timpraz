import express from "express";
import { DATA } from "./data.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors());

const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed/", seedRouter);
app.use("/api/products/", productRouter);
app.use("/api/category/", categoryRouter);
app.use("/api/users/", userRouter);
app.use("/api/orders/", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.get("/api/products", (req, res) => {
  res.send(DATA.Products);
});

app.get("/api/category", (req, res) => {
  res.send(DATA.category);
});

app.listen(port, () => {
  console.log(`Servidor en https://localhost:${port}`);
});
