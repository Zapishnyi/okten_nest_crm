import Joi from 'joi';
import IUserSignIn from '../interfaces/IUserSignIn';

const userValidator: Joi.ObjectSchema<IUserSignIn> = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .empty()
    .required()
    .min(3)
    .max(100)
    .messages({
      'string.email.base': 'must be valid email address',
      'string.min': '3 characters min',
      'string.max': '100 characters max',
    }),

  password: Joi.string()
    .pattern(/^[^\s]+$/)
    .required()
    .empty()
    .min(5)
    .max(16)
    .messages({
      'string.pattern.base': 'any character except space',
      'string.min': '5 characters min',
      'string.max': '16 characters max',
    }),

});

export default userValidator;