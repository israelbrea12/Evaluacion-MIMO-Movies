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
                type: Sequelize.STRING,
                allowNull: false,
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
                validate: {
                    len: [0, 500],
                },
            }, 

        });

        const User = db.define(
            "User",
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                indexes: [
                    {
                        unique: true,
                        fields: ["email"],
                    },
                    {
                        unique: true,
                        fields: ["username"],
                    },
                ],
            }
        );

        Movie.hasMany(Rating, { foreignKey: "movieId" });

        return db.sync().then(() => {
            return Movie.bulkCreate([
                { title: "Inception", genre: "Sci-Fi", duration: 148, rating: 2.3 },
                { title: "The Dark Knight", genre: "Action", duration: 152, rating: 4.7 },
                { title: "Interstellar", genre: "Sci-Fi", duration: 169, rating: 3.3 },
                { title: "Pulp Fiction", genre: "Crime", duration: 154, rating: 4.1 },
                { title: "The Godfather", genre: "Crime", duration: 175, rating: 1.9 },
                { title: "The Shawshank Redemption", genre: "Drama", duration: 142, rating: 4.1 }
            ]);
        });
    },
};