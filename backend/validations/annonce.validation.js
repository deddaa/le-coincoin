import Joi from "joi";

export const annonceSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description : Joi.string().required().max(500),
  price : Joi.number().required().positive().min(1).max(10000000),
  image_url : Joi.string()
});
