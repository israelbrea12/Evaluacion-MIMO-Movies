const Joi = require("joi");

const watchlistSchema = {
    addToWatchList: Joi.object().keys({
        movieId: Joi.number().min(1).required(),
        watched: Joi.boolean().required()
    })
};

module.exports = {
    watchlistSchema,
}