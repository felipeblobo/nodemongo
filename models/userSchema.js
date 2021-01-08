const Joi = require('joi');

module.exports = Joi.object({
    nome: Joi.string().min(3).max(30).required(),

    idade: Joi.number().integer().required(),

    profissão: Joi.string().required(),

    email: Joi.string().email(),
});
