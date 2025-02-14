const { RatingModel } = require("../models/rating");

const ratingsController = {
    async getMovieRatings(req, res) {
        const ratings = await RatingModel.findAllRatingsByMovieId({
            movieId: req.params.movieId,
        });
        res.json(ratings);
    },

    async getMovieRating(req, res) {
        const { movieId, ratingId } = req.params;

        try {
            const rating = await RatingModel.findRatingByMovieAndId(movieId, ratingId);

            if (!rating) {
                return res.status(404).json({ error: "Rating not found" });
            }

            res.status(200).json(rating);
        } catch (error) {
            console.error("Error fetching rating:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async createMovieRating(req, res) {
        const body = req.body;
        try {
            const rating = await RatingModel.createMovieRating({
                userId: req.userId,
                movieId: req.params.movieId,
                rating: body.rating,
                comment: body.comment,
            });

            res.location(`/movies/${req.params.movieId}/ratings/${rating.id}`);
            res.status(201).json(rating);
        } catch (error) {
            console.error("Error creating rating:", error); // Log del error
            res.status(400).json({ error: "Bad Request" });
        }
    },

    async updateMovieRating(req, res) {
        const { movieId, ratingId } = req.params;
        const { body, userId } = req;

        try {
            const [affectedRows] = await RatingModel.updateRating(
                { id: ratingId, movieId, userId },
                {
                    rating: body.rating,
                    comment: body.comment,
                }
            );

            if (affectedRows === 0) {
                return res.status(404).json({ error: "Rating not found or not authorized" });
            }

            const updatedRating = await RatingModel.findRatingByMovieAndId(movieId, ratingId);
            return res.status(200).json(updatedRating);
        } catch (error) {
            console.error("Error updating rating:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    async deleteMovieRating(req, res) {
        const { movieId, ratingId } = req.params;
        const { userId } = req;

        try {
            // Intentamos eliminar la valoración únicamente si pertenece al usuario autenticado
            const affectedRows = await RatingModel.deleteRating({
                id: ratingId,
                movieId,
                userId,
            });

            if (affectedRows === 0) {
                return res.status(404).json({ error: "Rating not found" });
            }

            return res.status(204).end(); // No content
        } catch (error) {
            console.error("Error deleting rating:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = { ratingsController };