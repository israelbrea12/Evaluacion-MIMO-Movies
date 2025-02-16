const { Sequelize } = require("sequelize");
const { generateHashedPassword } = require("../auth");

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

        const Watchlist = db.define(
            "Watchlist",
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                movieId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                watched: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
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

        User.hasMany(Rating, { foreignKey: "userId" });
        Watchlist.hasMany(Movie, { foreignKey: "movieId" });

        return db.sync().then(async () => {

            // Insertar usuarios con contraseñas encriptadas
            const hashedPasswords = await Promise.all([
                generateHashedPassword("test_test_test", 10),
                generateHashedPassword("test_test_test2", 10),
                generateHashedPassword("test_test_test3", 10),
            ]);

            // Insertar películas
            await Movie.bulkCreate([
                { title: "Inception", genre: "Sci-Fi", duration: 148, rating: 2.3 },
                { title: "The Dark Knight", genre: "Action", duration: 152, rating: 4.7 },
                { title: "Interstellar", genre: "Sci-Fi", duration: 169, rating: 3.3 },
                { title: "Pulp Fiction", genre: "Crime", duration: 154, rating: 4.1 },
                { title: "The Godfather", genre: "Crime", duration: 175, rating: 1.9 },
                { title: "The Shawshank Redemption", genre: "Drama", duration: 142, rating: 4.1 }
            ]);

            // Insertar usuarios estáticos
            await User.bulkCreate([
                { name: "Test", email: "Test@example.org", username: "test", password: hashedPasswords[0] },
                { name: "Test2", email: "Test2@example.org", username: "test2", password: hashedPasswords[1] },
                { name: "Test3", email: "Test3@example.org", username: "test3", password: hashedPasswords[2] }
            ]);
        });
    },
};