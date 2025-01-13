import Joi from 'joi';

export const groupValidator = Joi.string()
  .pattern(/^[^\s]+$/)
  .min(3)
  .max(25)
  .required()
  .messages({
    'string.empty': 'Can\'t be empty.',
    'string.pattern.base': 'Spaces are not allowed.',
    'string.min': 'Input must be at least 3 characters.',
    'string.max': 'Input cannot exceed 25 characters.',
  });