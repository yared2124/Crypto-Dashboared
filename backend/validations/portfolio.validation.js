import Joi from "joi";

export const transactionSchema = Joi.object({
  cryptoId: Joi.number().integer().required(),
  amount: Joi.number().positive().required(),
  pricePerUnit: Joi.number().positive().required(),
  type: Joi.string().valid("buy", "sell").required(),
  notes: Joi.string().optional(),
});
