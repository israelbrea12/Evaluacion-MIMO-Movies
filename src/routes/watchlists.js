const express = require("express");

const { watchlistsController } = require("../controllers/watchlists");
const { verifyToken } = require("../middlewares/verifyToken");
const { validatePayload } = require("../middlewares/validatePayload");
const { watchlistSchema } = require("../schemas/watchlist");

const router = express.Router();

router.get("/:userId", verifyToken ,watchlistsController.getUserWatchlist);
router.post("/:userId/items", validatePayload(watchlistSchema.addToWatchList), verifyToken, watchlistsController.addToWatchlist);
router.delete("/:userId/items/:itemId", verifyToken, watchlistsController.removeFromWatchlist);

module.exports = {
    watchlistRoutes: router,
}