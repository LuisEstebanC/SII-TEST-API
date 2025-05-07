import express from "express";
import {
  createCard,
  getCards,
  getCardById,
  updateCardById,
} from "../controllers/cardController.js";

import validateCardData from "../middlewares/inputValidator.js";
const router = express.Router();

router.post("/card", validateCardData, createCard);
router.get("/", getCards);
router.get("/card/:id", getCardById);
router.put("/card/:id", validateCardData, updateCardById);

export default router;
