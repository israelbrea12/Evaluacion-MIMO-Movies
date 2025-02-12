const Joi = require("joi");

const ratingSchema = {
    createMovieRating: Joi.object().keys({
        rating: Joi.number().min(0).max(5).required().messages({
            "number.base": "La valoración debe ser un número.",
            "number.min": "La valoración no puede ser menor a 0.",
            "number.max": "La valoración no puede ser mayor a 5.",
            "any.required": "La valoración es obligatoria."
        }),
        comment: Joi.string().max(500).allow("").messages({
            "string.max": "El comentario no puede tener más de 500 caracteres."
        }),
    }),
    updateMovieRating: Joi.object().keys({
        rating: Joi.number().min(0).max(5).required().messages({
            "number.base": "La valoración debe ser un número.",
            "number.min": "La valoración no puede ser menor a 0.",
            "number.max": "La valoración no puede ser mayor a 5.",
            "any.required": "La valoración es obligatoria."
        }),
        comment: Joi.string().max(500).allow("").messages({
            "string.max": "El comentario no puede tener más de 500 caracteres."
        }),
    }),
};

module.exports = {
    ratingSchema,
}