const db = require('../db');

const WatchlistModel = {
    get model() {
        return db.instance.models.Watchlist;
    },

    async getUserWatchList(query) {
        return this.model.findAll({
            where: query,
        });
    },

    async addToWatchList(addMovie) {
        return this.model.create(addMovie);
    },

    async findMoviebyMovieId(movieId) {
        return db.instance.models.Movie.findByPk(movieId);
    },

    async isMovieInWatchlist(userId, movieId) {
        return this.model.findOne({
            where: { userId, movieId },
        });
    },

    async removeFromWatchlist(query) {
        return this.model.destroy({
            where:query,
        });
    },
};

module.exports = {
    WatchlistModel,
}