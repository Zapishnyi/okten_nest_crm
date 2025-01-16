import Joi from 'joi';

const commentValidator: Joi.ObjectSchema = Joi.object({

  comment: Joi.string()
    .allow('')
    .required()
    .max(60)
    .messages({
      'string.max': '60 characters max',
    }),

});

export default commentValidator;
