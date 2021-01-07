const Joi = require("joi");

const userSchema = Joi.object({
    nome: Joi.string().alphanum().min(3).max(30).required(),

    idade: Joi.number().integer().min(14).max(110).required(),

    profissão: Joi.string().alphanum().required(),
});

module.exports = { userSchema }