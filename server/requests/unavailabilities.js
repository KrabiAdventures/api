const Joi = require('joi');
const { RequestValidation } = require('request-validation');

module.exports = {
  validate: new RequestValidation({
    create: {
      body: Joi.object().keys({
        description: Joi.string().required(),
        date_to: Joi.string().isoDate().required(),
        date_from: Joi.string().isoDate().required(),
        product_id: Joi.number().required(),
      })
    },
    update: {
      body: Joi.object().keys({
        description: Joi.string(),
        date_to: Joi.string().isoDate(),
        date_from: Joi.string().isoDate(),
        product_id: Joi.number(),
      })
    }
  })
};
