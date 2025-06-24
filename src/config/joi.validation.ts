import * as joi from 'joi';

export const JoiValidationSchema = joi.object({
  PORT: joi.number().default(3000),
  APP_ORIGIN: joi.string().required(),
  MONGO_URI: joi.string().required(),
  DB_NAME: joi.string().required(),
});
