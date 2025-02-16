const db = require("../db");

const MovieModel = {
    getModel() {
        return db.instance.models.Movie;
    },
    // Busca todas las películas con paginación.
    async findAllMovies(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await this.getModel().findAndCountAll({
            offset,
            limit,
        });

        return {
            results: rows,
            hasNextPage: offset + rows.length < count,
            pageSize: rows.length,
            next: offset + rows.length < count ? `/movies?page=${page + 1}&limit=${limit}` : null,
        };
    },
};

module.exports = {
    MovieModel,
};