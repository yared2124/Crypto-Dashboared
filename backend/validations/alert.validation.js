import Joi from "joi";

export const alertSchema = Joi.object({
  cryptoId: Joi.number().integer().required(),
  targetPrice: Joi.number().positive().required(),
  direction: Joi.string().valid("above", "below").required(),
});
