import Joi from 'joi';

import { store } from '../redux/store';

const groups = store.getState().groups.groups;

export const groupValidator = Joi.string()
  .allow('')
  .pattern(/^[^\s]+$/)
  .invalid(...groups)
  .min(3)
  .max(25)
  .required()
  .messages({
    'string.empty': 'Can\'t be empty.',
    'string.pattern.base': 'Spaces are not allowed.',
    'string.min': 'Must be at least 3 characters.',
    'string.max': 'Cannot exceed 25 characters.',
    'any.invalid': 'Must be unique.',
  });