const express = require("express");

const { validatePayload } = require("../middlewares/validatePayload");
const { moviesController } = require("../controllers/movies");
const { ratingsController } = require("../controllers/ratings");
const { ratingSchema } = require("../schemas/rating");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", moviesController.getAllMovies);

// Ratings
router.get("/:movieId/ratings", ratingsController.getMovieRatings);
router.post("/:movieId/ratings",verifyToken ,validatePayload(ratingSchema.createMovieRating), ratingsController.createMovieRating); // Debes estar protegida
router.get("/:movieId/ratings/:ratingId", ratingsController.getMovieRating);
router.patch("/:movieId/ratings/:ratingId", verifyToken, validatePayload(ratingSchema.updateMovieRating) , ratingsController.updateMovieRating); // Debe estar protegida
router.delete("/:movieId/ratings/:ratingId", verifyToken, ratingsController.deleteMovieRating); // Debe estar protegida

module.exports = {
    movieRoutes: router,
}