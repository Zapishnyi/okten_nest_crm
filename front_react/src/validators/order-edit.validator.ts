import Joi from 'joi';

import { CourseFormatEnum } from '../enums/course-format.enum';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseEnum } from '../enums/course.enum';
import { StatusEnum } from '../enums/status.enum';

const orderEditValidator: Joi.ObjectSchema = Joi.object({
  name: Joi.string()
    .allow(null, '')
    .optional()
    .pattern(/^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ]+$/)
    .max(25)
    .min(3)
    .messages({
      'string.pattern.base': 'Name must contain only letters',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must not exceed 25 characters',
    }),

  surname: Joi.string()
    .allow(null, '')
    .optional()
    .pattern(/^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ]+$/)
    .max(25)
    .min(3)
    .messages({
      'string.pattern.base': 'Surname must contain only letters',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must not exceed 25 characters',
    }),

  email: Joi.string()
    .allow(null, '')
    .optional()
    .email({ tlds: { allow: false } })
    .min(3)
    .max(100)
    .messages({
      'string.email.base': 'must be valid email address',
      'string.min': '3 characters min',
      'string.max': '100 characters max',
    }),
  phone: Joi.string()
    .allow(null, '')
    .optional()
    .pattern(/^(?:\+380)?\d{9,12}$/)
    .messages({
      'string.pattern.base': 'Ukrainian local or international ',
    }),

  age: Joi.number()
    .allow(null, '')
    .optional()
    .integer()
    .min(16)
    .max(120)
    .messages({
      'number.base': 'Age must be a number',
      'number.min': 'You must be at least 16 years old',
      'number.max': 'Age must not exceed 120 years',
    }),

  course: Joi.string()
    .valid(...Object.values(CourseEnum)),

  course_format: Joi.string()
    .valid(...Object.values(CourseFormatEnum)),

  course_type: Joi.string()
    .valid(...Object.values(CourseTypeEnum)),

  sum: Joi.number()
    .allow(null, '')
    .optional()
    .integer()
    .positive()
    .messages({
      'number.base': 'Sum must be a number',
      'number.positive': 'Sum must be positive',
    }),

  alreadyPaid: Joi.number()
    .allow(null, '')
    .optional()
    .integer()
    .positive()
    .messages({
      'number.base': 'Sum must be a number',
      'number.positive': 'Sum must be positive',
    }),

  status: Joi.string()
    .allow(null)
    .valid(...Object.values(StatusEnum)),

  group: Joi.string()
    .allow(null, '')
    .optional(),
});

export default orderEditValidator;
