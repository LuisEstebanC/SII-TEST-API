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

const validateCardData = (data) => {
  let { cardholder_name, card_number, cvv, brand, exp_month, exp_year } = data;
  exp_month = Number(exp_month);
  exp_year = Number(exp_year);
  if (
    !cardholder_name ||
    !card_number ||
    !cvv ||
    !brand ||
    !exp_month ||
    !exp_year
  ) {
    return "All fields are required.";
  }

  if (!/^\d{16}$/.test(card_number)) {
    return "Card number must be 16 digits.";
  }

  if (!/^\d{3}$/.test(cvv)) {
    return "CVV must be 3 digits.";
  }
  if (!/^[a-zA-Z\s]+$/.test(brand)) {
    return handleResponse(
      res,
      400,
      "Brand must only contain letters and spaces",
      null
    );
  }

  if (exp_month < 1 || exp_month > 12) {
    return "Expiration month must be between 1 and 12.";
  }

  const currentYear = new Date().getFullYear();
  const minYear = 2022;
  const maxYear = currentYear + 5;

  if (exp_year < minYear || exp_year > maxYear) {
    return `Expiration year must be between ${minYear} and ${maxYear}.`;
  }

  if (exp_year === currentYear && exp_month < new Date().getMonth() + 1) {
    return "Expiration month must be greater than the current month.";
  }

  return null;
};
//TODO: Add validation for cardholder_name, just letters, spaces and letters with accents.

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

  const validationError = validateCardData(req.body);
  if (validationError) {
    return handleResponse(res, 400, validationError, null);
  }
  const existingCard = await getCardByNumberService(card_number);
  if (existingCard) {
    return handleResponse(res, 400, "Card already exists", null);
  }
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

  const validationError = validateCardData(req.body);
  if (validationError) {
    return handleResponse(res, 400, validationError, null);
  }

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
//TODO: Add validation for cardholder_name, just letters, spaces and letters with accents.
//TODO: Add validation for card_number, just numbers and 16 digits long and not repeated.
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
