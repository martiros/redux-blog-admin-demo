const Joi = require('joi');

const schema = Joi.object().keys({
  title: Joi.string().min(10).max(200).required(),
  content: Joi.string().min(50).max(60000).required(),
});

export default schema;
