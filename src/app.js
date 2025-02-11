const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler");
const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { respondTo } = require("./middlewares/respondTo");
const { movieRoutes } = require("./routes/movies");
const { ratingRoutes } = require("./routes/ratings");
const { userRoutes } = require("./routes/users");
const { sessionRoutes } = require("./routes/sessions");

const app = express();

app.use(express.json());
app.use(respondTo("application/json"));
app.use(errorHandler);
app.use("/movies", movieRoutes);
//app.use("/ratings", ratingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/users", userRoutes);
app.use(notFoundHandler);

module.exports = {
  app,
};
