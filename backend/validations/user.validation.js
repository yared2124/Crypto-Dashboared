import Joi from "joi";

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
