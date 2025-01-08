import Joi from 'joi';

import IUserSignIn from '../interfaces/IUserSignIn';

const userActivateValidator: Joi.ObjectSchema<IUserSignIn> = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)\S*$/)
    .required()
    .empty()
    .min(5)
    .max(16)
    .messages({
      'string.pattern.base':
        `digit, lowercase letter, uppercase letter, 
       special character, no space`,
      'string.min': '5 characters min',
      'string.max': '16 characters max',
    }),
  re_password: Joi.any().equal(Joi.ref('password')).empty().messages({
    'any.only': 'passwords are not the same',
  }),
});

export default userActivateValidator;