import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().max(60).required(),
    password_hash: Joi.string().min(8).max(60).required(),
    username: Joi.string().min(3).max(30).required()
})