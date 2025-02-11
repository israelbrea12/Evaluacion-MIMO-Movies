const { MovieModel } = require("../models/movie");

const moviesController = {
    async getAllMovies(req, res) {
        const movies = await MovieModel.findAllMovies();
        res.json(movies);
    },
};

module.exports = {
    moviesController,
};