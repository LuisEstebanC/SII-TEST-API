import express from "express";
import { createCard, getCards } from "../controllers/cardController.js";

import validateCardData from "../middlewares/inputValidator.js";
const router = express.Router();

router.post("/card", validateCardData, createCard);
router.get("/", getCards);

export default router;
