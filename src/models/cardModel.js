import pool from "../config/db.js";

export const createCardService = async (
  cardholder_name,
  card_number,
  cvv,
  brand,
  exp_month,
  exp_year,
  background_image_url,
  unique_id
) => {
  const result = await pool.query(
    "SELECT insert_credit_card($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      cardholder_name,
      card_number,
      cvv,
      brand,
      exp_month,
      exp_year,
      background_image_url,
      unique_id,
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
  background_image_url,
  unique_id
) => {
  const result = await pool.query(
    "SELECT update_credit_card($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      id,
      cardholder_name,
      card_number,
      cvv,
      brand,
      exp_month,
      exp_year,
      background_image_url,
      unique_id,
    ]
  );
  return result.rows[0];
};
export const deleteCardByIdService = async (id) => {
  const result = await pool.query("SELECT delete_credit_card($1)", [id]);
  return result.rows[0];
};
export const getCardByNumberService = async (card_number) => {
  const result = await pool.query(
    "SELECT * FROM get_credit_card_by_number($1)",
    [card_number]
  );
  return result.rows[0];
};
