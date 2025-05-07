import express from "express";
import {
  createCard,
  getCards,
  getCardById,
  updateCardById,
  deleteCardById,
  getCardByNumber,
} from "../controllers/cardController.js";

import validateCardData from "../middlewares/inputValidator.js";
const router = express.Router();

router.post("/card", validateCardData, createCard);
router.get("/", getCards);
router.get("/card/:id", getCardById);
router.put("/card/:id", validateCardData, updateCardById);
router.delete("/card/:id", deleteCardById);
router.get("/card/number/:card_number", getCardByNumber);

export default router;
