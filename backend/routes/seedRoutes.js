import express from "express";
import { DATA } from "../data.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(DATA.Products);

  await Category.remove({});
  const createdCategory = await Category.insertMany(DATA.category);

  await User.remove({});
  const createdUser = await User.insertMany(DATA.users);
  res.send({ createdProducts, createdCategory, createdUser });
});

export default seedRouter;
