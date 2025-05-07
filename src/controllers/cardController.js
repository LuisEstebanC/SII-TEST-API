import { createCardService } from "../models/cardModel.js";

const handleResponse = (res, statusCode, message, data) => {
  res.status(statusCode).json({
    status: statusCode === 200 ? "success" : "error",
    message,
    data,
  });
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
