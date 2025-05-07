import express from "express";
import { createCard } from "../controllers/cardController.js";

import validateCardData from "../middlewares/inputValidator.js";
const router = express.Router();

router.post("/card", validateCardData, createCard);

export default router;
