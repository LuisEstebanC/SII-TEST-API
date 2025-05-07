import {
  createCardService,
  getCardsService,
  getCardByIdService,
  updateCardByIdService,
  deleteCardByIdService,
  getCardByNumberService,
} from "../models/cardModel.js";

const handleResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: statusCode === 200 ? "success" : "error",
    message,
    data,
  });
};
export const getCardByNumber = async (req, res) => {
  const { card_number } = req.params;
  try {
    const card = await getCardByNumberService(card_number);
    if (!card) {
      return handleResponse(res, 404, "Card not found", null);
    }
    handleResponse(res, 200, "Card retrieved successfully", card);
  } catch (error) {
    handleResponse(res, 500, "Error retrieving card", error.message);
  }
};

export const createCard = async (req, res, next) => {
  const {
    cardholder_name,
    card_number,
    cvv,
    brand,
    exp_month,
    exp_year,
    background_image_url,
  } = req.body;

  try {
    const newCard = await createCardService(
      cardholder_name,
      card_number,
      cvv,
      brand,
      exp_month,
      exp_year,
      background_image_url
    );
    handleResponse(res, 201, "Card created successfully", newCard);
  } catch (error) {
    handleResponse(res, 500, "Error creating card", error.message);
  }
};

export const getCards = async (req, res) => {
  try {
    const cards = await getCardsService();
    handleResponse(res, 200, "Cards retrieved successfully", cards);
  } catch (error) {
    handleResponse(res, 500, "Error retrieving cards", error.message);
  }
};

export const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await getCardByIdService(id);
    if (!card) {
      return handleResponse(res, 404, "Card not found", null);
    }
    handleResponse(res, 200, "Card retrieved successfully", card);
  } catch (error) {
    handleResponse(res, 500, "Error retrieving card", error.message);
  }
};

export const updateCardById = async (req, res) => {
  const { id } = req.params;
  const {
    cardholder_name,
    card_number,
    cvv,
    brand,
    exp_month,
    exp_year,
    background_image_url,
  } = req.body;

  try {
    const updatedCard = await updateCardByIdService(
      id,
      cardholder_name,
      card_number,
      cvv,
      brand,
      exp_month,
      exp_year,
      background_image_url
    );
    if (!updatedCard) {
      return handleResponse(res, 404, "Card not found", null);
    }
    handleResponse(res, 200, "Card updated successfully", updatedCard);
  } catch (error) {
    handleResponse(res, 500, "Error updating card", error.message);
  }
};
export const deleteCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCard = await deleteCardByIdService(id);
    if (!deletedCard) {
      return handleResponse(res, 404, "Card not found", null);
    }
    handleResponse(res, 200, "Card deleted successfully", deletedCard);
  } catch (error) {
    handleResponse(res, 500, "Error deleting card", error.message);
  }
};
