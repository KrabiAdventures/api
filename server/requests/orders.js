const Joi = require('joi');
const { RequestValidation } = require('request-validation');

module.exports = {
  validate: new RequestValidation({
    create: {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_no: Joi.string().min(11),
        paid_with: Joi.string().required(),
        products: Joi.array().required().items(
          Joi.object().keys({
            product_id: Joi.number().required(),
            pickup_location: Joi.string().required(),
            adult_quantity: Joi.number().required(),
            child_quantity: Joi.number().required(),
            date: Joi.string().isoDate().required()
          })
        )
      })
    },
    update: {
      body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        phone_no: Joi.string().min(11),
        paid_with: Joi.string(),
        products: Joi.array().items(
          Joi.object({
            product_id: Joi.number().required(),
            pickup_location: Joi.string(),
            adult_quantity: Joi.number(),
            child_quantity: Joi.number(),
            date: Joi.string().isoDate()
          })
        )
      })
    }
  })
};
