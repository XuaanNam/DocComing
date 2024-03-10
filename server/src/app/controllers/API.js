const pool = require("../models/pool");
const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 9;
const encodeToken = require("../../util/encodeToken");
const createError = require("http-errors");
const myOAuth2Client = require("../../app/configs/oauth2client");
const nodemailer = require("nodemailer");
const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: process.env.PP_MODE,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.PP_SECRET_KEY,
});

class API {
    
}

module.exports = new API();