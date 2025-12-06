// routes/checkoutRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import * as checkoutController from "../controllers/checkoutController.js";
const checkoutrouter = express.Router();
checkoutrouter.post("/", auth, checkoutController.checkout);
export default checkoutrouter;
