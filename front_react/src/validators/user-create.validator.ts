import Joi from 'joi';

import IUserSignIn from '../interfaces/IUserSignIn';

const userCreateValidator: Joi.ObjectSchema<IUserSignIn> = Joi.object({
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

  name: Joi.string()
    .required()
    .pattern(/^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ]+$/)
    .empty()
    .min(1)
    .max(25)
    .messages({
      'string.pattern.base': 'Surname must contain only letters',
      'string.min': '2 characters min',
      'string.max': '16 characters max',
    }),
  surname: Joi.string()
    .required()
    .pattern(/^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ]+$/)
    .empty()
    .min(1)
    .max(25)
    .messages({
       'string.pattern.base': 'Surname must contain only letters',
      'string.min': '2 characters min',
      'string.max': '25 characters max',
    }),
});

export default userCreateValidator;