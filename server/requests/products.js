const Joi = require('joi');
const { RequestValidation } = require('request-validation');

module.exports = {
  validate: new RequestValidation({
    create: {
      body: Joi.object().keys({
        title: Joi.string().required(),
        adult_price: Joi.number().precision(2),
        child_price: Joi.number().precision(2),
        description: Joi.string().required(),
        excerpt: Joi.string().required(),
        itinerary: Joi.string().required(),
        time: Joi.string().isoDate().required(),
        image_url: Joi.string(),
        published: Joi.boolean().truthy(1).falsy(0).insensitive(false).required()
      })
    },
    update: {
      body: Joi.object().keys({
        title: Joi.string(),
        adult_price: Joi.number().precision(2),
        child_price: Joi.number().precision(2),
        description: Joi.string(),
        excerpt: Joi.string(),
        itinerary: Joi.string(),
        time: Joi.string().isoDate().required(),
        image_url: Joi.string(),
        published: Joi.boolean().truthy(1).falsy(0).insensitive(false)
      })
    }
  })
};
