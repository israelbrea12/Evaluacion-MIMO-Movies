const express = require("express");

const { validatePayload } = require("../middlewares/validatePayload");
const { moviesController } = require("../controllers/movies");

const router = express.Router();

router.get("/", moviesController.getAllMovies);

module.exports = {
    movieRoutes: router,
}