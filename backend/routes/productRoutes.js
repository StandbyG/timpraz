import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Producto no encontrado" });
  }
});

productRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      title: req.body.title,
      slug: req.body.slug,
      desc: req.body.desc,
      category: req.body.category,
      image: req.body.image,
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      countInStock: req.body.countInStock,
      price: req.body.price,
    });
    const product = await newProduct.save();
    res.send({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      desc: product.slug,
      category: product.category,
      image: product.image,
      image1: product.image1,
      image2: product.image2,
      image3: product.image3,
      countInStock: product.countInStock,
      price: product.price,
    });
  })
);

export default productRouter;
