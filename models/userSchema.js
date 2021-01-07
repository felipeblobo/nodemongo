const Joi = require('joi');

module.exports = Joi.object({
    nome: Joi.string().alphanum().min(3).max(30).required(),

    idade: Joi.number().integer().required(),

    profissão: Joi.string().alphanum().required(),
});
