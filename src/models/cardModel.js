import pool from "../config/db.js";

export const createCardService = async (
  cardholder_name,
  card_number,
  cvv,
  brand,
  exp_month,
  exp_year,
  background_image_url
) => {
  const result = await pool.query(
    "SELECT insert_credit_card($1, $2, $3, $4, $5, $6, $7)",
    [
      cardholder_name,
      card_number,
      cvv,
      brand,
      exp_month,
      exp_year,
      background_image_url,
    ]
  );
  return result.rows[0];
};
