const { app } = require("./src/app");
const { config } = require("./src/config");
const db = require("./src/config/db");

async function start() {
  await db.initialize();

  app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`);
  });
}

start();

