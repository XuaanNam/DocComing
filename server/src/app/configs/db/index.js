require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  module.exports = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    multipleStatements: true, 
  };
} else if (process.env.NODE_ENV === "development") {
  module.exports = {
    host: process.env.DB_HOST_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    multipleStatements: true,
  };
}
