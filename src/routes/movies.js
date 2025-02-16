const express = require("express");

const { moviesController } = require("../controllers/movies");

const router = express.Router();

router.get("/", moviesController.getAllMovies);

module.exports = {
    movieRoutes: router,
}