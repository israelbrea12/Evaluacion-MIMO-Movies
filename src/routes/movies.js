const express = require("express");

const { validatePayload } = require("../middlewares/validatePayload");
const { moviesController } = require("../controllers/movies");
const { ratingsController } = require("../controllers/ratings");
const { ratingSchema } = require("../schemas/rating");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", moviesController.getAllMovies);

// Ratings
router.use(verifyToken);

router.get("/:movieId/ratings", ratingsController.getMovieRatings);
router.get("/:movieId/ratings/:ratingId", ratingsController.getMovieRating);
router.post("/:movieId/ratings", validatePayload(ratingSchema.createMovieRating), ratingsController.createMovieRating);
router.patch("/:movieId/ratings/:ratingId",validatePayload(ratingSchema.updateMovieRating) , ratingsController.updateMovieRating);
router.delete("/:movieId/ratings/:ratingId", ratingsController.deleteMovieRating);

module.exports = {
    movieRoutes: router,
}