const Joi = require('joi');
const { RequestValidation } = require('request-validation');

module.exports = {
  validate: new RequestValidation({
    create: {
      body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        featured: Joi.boolean().truthy(1).falsy(0).insensitive(false).required(),
      })
    },
    update: {
      body: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        featured: Joi.boolean().truthy(1).falsy(0).insensitive(false),
      })
    }
  })
};
