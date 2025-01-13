import Joi from 'joi';

const orderEditValidator: Joi.ObjectSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .max(25)
    .min(3)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.pattern.base': 'Name must contain only letters',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must not exceed 25 characters',
    }),

  surname: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .max(25)
    .min(3)
    .required()
    .messages({
      'string.empty': 'Surname is required',
      'string.pattern.base': 'Surname must contain only letters',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must not exceed 25 characters',
    }),

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
  phone: Joi.string()
    .pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/) // Regex for phone numbers
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must be 10-15 digits long and can start with a +',
    }),

  age: Joi.number()
    .integer()
    .min(18)
    .max(120)
    .required()
    .messages({
      'number.base': 'Age must be a number',
      'number.min': 'You must be at least 16 years old',
      'number.max': 'Age must not exceed 120 years',
      'any.required': 'Age is required',
    }),
});

export default orderEditValidator;
