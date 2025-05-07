import Joi from "joi";

const userSchema = Joi.object({
  cardholder_name: Joi.string().min(3).max(20).required(),
  card_number: Joi.string()
    .max(16)
    .pattern(/^[0-9]+$/)
    .required(),
  cvv: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required(),
  brand: Joi.string().min(3).max(30).required(),
  exp_month: Joi.number().integer().min(1).max(12).required(),
  exp_year: Joi.number().integer().min(2022).max(2030).required(),
  background_image_url: Joi.string().optional(),
});

const validateCardData = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: 400, message: error.details[0].message });
  }
  next();
};

export default validateCardData;
