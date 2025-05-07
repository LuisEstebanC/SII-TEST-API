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
export const getCardsService = async () => {
  const result = await pool.query("SELECT * FROM get_all_credit_cards()");
  return result.rows;
};

export const getCardByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM get_credit_card($1)", [id]);
  return result.rows[0];
};
export const updateCardByIdService = async (
  id,
  cardholder_name,
  card_number,
  cvv,
  brand,
  exp_month,
  exp_year,
  background_image_url
) => {
  const result = await pool.query(
    "SELECT update_credit_card($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      id,
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
