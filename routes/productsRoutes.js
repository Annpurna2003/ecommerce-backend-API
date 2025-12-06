// routes/productsRoutes.js
import express from "express";
import { getAllProducts,getProductById } from "../controllers/productController.js";

const prodrouter = express.Router();

prodrouter.get("/", getAllProducts);
prodrouter.get("/:id",getProductById);

export default prodrouter;
