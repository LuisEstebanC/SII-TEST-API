import express from "express";
import { createCard } from "../controllers/cardController.js";

const router = express.Router();

router.post("/card", createCard);

export default router;
