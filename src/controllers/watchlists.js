const { exist } = require('joi');
const { WatchlistModel } = require('../models/watchlist');

const watchlistsController = {
    async getUserWatchlist(req, res) {
        const { params } = req;
        const userId = parseInt(params?.userId, 10);
        const watchlist = await WatchlistModel.getUserWatchList({
            userId: userId,
        });

        res.json(watchlist);
    },

    async addToWatchlist(req, res) {
        const { params, body } = req;
        const userId = parseInt(params?.userId, 10);

        const existingMovie = await WatchlistModel.isMovieInWatchlist(userId, body?.movieId);
        if (existingMovie) {
            return res.status(409).json({ error: "La película ya existe en el watchlist" });
        }

        const movie = await WatchlistModel.findMoviebyMovieId(body?.movieId)

        if (!movie) {
            return res.status(404).json({ error: "Película no encontrada" });
        }

        try {
            const movieWatchlist = await WatchlistModel.addToWatchList({
                userId: userId,
                movieId: body?.movieId,
                title: movie.title,
                watched: body?.watched,
            });

            res.location(`/watchlist/${req.userId}/items`);
            res.status(201).json(movieWatchlist);

        } catch {
            res.status(400).json({ error: "Bad Request" });
        }
    },

    async removeFromWatchlist(req, res) {
        const { userId, itemId } = req.params;

        try {
            const affectedRows = await WatchlistModel.removeFromWatchlist({
                id: itemId,
                userId,
            });

            if (affectedRows === 0) {
                return res.status(404).json({ error: "Item not found" });
            }

            return res.status(204).end();
        } catch (error) {
            console.error("Error deleting item:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


module.exports = {
    watchlistsController,
}