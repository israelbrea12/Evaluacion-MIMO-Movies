const db = require("../db");

const RatingModel = {
    get model() {
        return db.instance.models.Rating;
    },

    async createMovieRating(rating) {
        return this.model.create(rating);
    },
    

    async findAllRatingsByMovieId(query) {
        return this.model.findAll({
          where: query,
        });
      },

    async findRatingByMovieAndId(movieId, ratingId) {
        return this.model.findOne({
            where: {
                id: ratingId,
                movieId: movieId,
            },
        });
    },

    async updateRating(query, updatedFields) {
        return this.model.update(updatedFields, {
            where: query,
        });
    },

    async deleteRating(query) {
        return this.model.destroy({
            where: query,
        });
    },
};

module.exports = {
    RatingModel,
};