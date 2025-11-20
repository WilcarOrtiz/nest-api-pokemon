import * as Joi from 'joi';
/*Cambios */
export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3005),
  DEFAULTLIMIT: Joi.number().default(6),
});
