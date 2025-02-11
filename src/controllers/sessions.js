const { UserModel } = require("../models/user");
const { generateAccessToken, compareHashedPassword } = require("../auth");

const sessionsController = {
  async createSession(req, res) {
    const { username, password } = req.body;

    const user = await UserModel.findUser({ 
      username, 
    });

    if (user === null) { 
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await compareHashedPassword( 
      password, 
      user.password 
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = generateAccessToken({
      id: user.id,
    });

    res.status(201).json({
      accessToken, 
    });
  },
};

module.exports = {
  sessionsController,
};
