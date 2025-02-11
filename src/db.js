const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

module.exports = {
    get instance() {
        return db;
    },
    initialize() {
        const Movie = db.define("Movie", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            genre: {
                type: Sequelize. STRING,
                allowNull:false,
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
              },
              rating: {
                type: Sequelize.FLOAT,
                allowNull: true,
              },
        });

        const Rating = db.define("Rating", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            movieId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            rating: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: { min: 0, max: 5 }
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        });

        Movie.hasMany(Rating, { foreignKey: "movieId" });
        
        return db.sync().then(() => {
            return Movie.bulkCreate([
                { title: "Inception", genre: "Sci-Fi", duration: 148},
                { title: "The Dark Knight", genre: "Action", duration: 152},
                { title: "Interstellar", genre: "Sci-Fi", duration: 169},
                { title: "Pulp Fiction", genre: "Crime", duration: 154},
                { title: "The Godfather", genre: "Crime", duration: 175,},
                { title: "The Shawshank Redemption", genre: "Drama", duration: 142}
            ]);
        });
    },
};