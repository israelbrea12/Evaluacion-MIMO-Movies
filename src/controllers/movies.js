const { MovieModel } = require("../models/movie");

const moviesController = {
    async getAllMovies(req, res) {
        try {
            let { page, limit } = req.query;

            // Solucionado gracias a testing, ya que antes detectaba como string y lo dejaba pasar.
            page = Number.isInteger(Number(page)) ? Number(page) : 1;
            limit = Number.isInteger(Number(limit)) ? Number(limit) : 10;

            if (page < 1 || limit < 1) {
                return res.status(400).json({ error: "Los valores de page y limit deben ser mayores a 0." });
            }

            const moviesData = await MovieModel.findAllMovies(page, limit);

            res.json(moviesData);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las películas." });
        }
    },
};

module.exports = {
    moviesController,
};