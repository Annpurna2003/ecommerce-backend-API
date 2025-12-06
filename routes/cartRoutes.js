// routes/cartRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { addToCartSchema } from "../validations/cart.validation.js";
import * as cartController from "../controllers/cartController.js";

const cartrouter = express.Router();

// Add to cart
cartrouter.post("/add", auth, validate(addToCartSchema), cartController.addToCart);

// Get cart items
cartrouter.get("/get", auth, cartController.getCartItems);

// Remove from cart
cartrouter.delete("/:id", auth, cartController.removeItem);

export default cartrouter;
