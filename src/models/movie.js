const db = require("../db");

const MovieModel = {
    getModel() {
        return db.instance.models.Movie;
    },
    findAllMovies(query) {
        return this.getModel().findAll({
            where: query,
        });
    },
};

module.exports = {
    MovieModel,
};