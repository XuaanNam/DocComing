require("dotenv").config();

module.exports = {
  secret_key: process.env.JWT_SECRET_KEY,
  iss: process.env.JWT_ISS,
};
